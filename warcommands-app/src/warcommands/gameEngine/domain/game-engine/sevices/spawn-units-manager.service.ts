import { SpawingBuildingsRepositoryservice } from '../../building/services/spawning-buildings-repository.service';import { BuildingsRepositoryService } from '../../building/services/buildings-repository.service';import { GameLogicTimeFrameService } from './game-logic-time-frame.service';import { GameEventBusService } from '../../game-event-bus/services/game-event-bus.service';
import { MapBlockedTilesManagerService } from '../../maps/services/map-blocked-tiles-manager.service';
import { SpawnerBuildingDTO } from '../../building/model/building.dto';
import { UnitsRepositoryService } from '../../units/services/units-repository.service';
import { BuildingSpawnedUnitEvent } from '../events/building-spawned-unit.event';
import { BuildingSpawnerServiceFactory } from './building-spawner-service.factory';
import { BuildingSpawnerService } from '../../building/services/building-spawner.service';
import { UnitGenericDTO } from '../../units/model/unit-generic.dto';
import { BuildingSpawningUnitEvent } from '../events/building-spawning-unit.event';
import { BuildingRemovedUnitFromQueueEvent } from '../events/building-removed-unit-from-queue.event';
import { UnitSpawningStatusENUM } from '../../units/model/unit-spawning-status.enum';


export class SpawnUnitsManagerService {

    private nextTileToCheckList = [
        [ 0, 1 ],
        [ -1, 1 ],
        [ 1, 1 ],
        [ -1, 0 ],
        [ 1, 0],
        [ -1, -1 ],
        [ 1, -1 ],
        [ 0, -1 ],
    ];

    constructor(
        private readonly spawningBuildngsRepositoryService: SpawingBuildingsRepositoryservice,
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly gameLogicTimeFrameService: GameLogicTimeFrameService,
        private readonly mapBlockedTilesManagerService: MapBlockedTilesManagerService,
        private readonly gameEventBusService: GameEventBusService,
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly buildingSpawnerServiceFactory: BuildingSpawnerServiceFactory,
    ) {}
    
    spawnUnits(): void {
        if (this.spawningBuildngsRepositoryService.countSpawingBuildings()) {
            const spawningBuildingList = this.spawningBuildngsRepositoryService.getAll();

            for (const buildingId of spawningBuildingList) {
                const building: SpawnerBuildingDTO = (this.buildingsRepositoryService.findById(buildingId) as SpawnerBuildingDTO);

                if (<number>building.unitSpawning.spawnFinish < this.gameLogicTimeFrameService.getElapsedTime()) {
                    this.spawnUnit(building);

                    if (this.thereAreMoreUnitsInQueue(building)) {
                        this.spawnNextUnitInQueue(building);
                    } else {
                        this.spawningBuildngsRepositoryService.remove(buildingId);
                    }

                    this.buildingsRepositoryService.save(building);
                }
            }
        }
    }

    private spawnUnit(building: SpawnerBuildingDTO): void {
        const unitId: string = <string>building.unitSpawning.unit?.id;
        const unit = this.unitsRepositoryService.findById(unitId);
        unit.spawningStatus = UnitSpawningStatusENUM.Spawned;
        this.unitsRepositoryService.save(unit);

        building.unitSpawning.unit = null;
        building.unitSpawning.spawnFinish = 0;
        building.unitSpawning.spawnStart = 0;

        this.mapBlockedTilesManagerService.blockTileFromUnit(unit);

        const event: BuildingSpawnedUnitEvent = new BuildingSpawnedUnitEvent(building, unit);
        this.gameEventBusService.cast(event);
    }

    private thereAreMoreUnitsInQueue(building: SpawnerBuildingDTO): boolean {
        return building.queueList.length > 0;
    }

    private getBuildingSpawnerService(building: SpawnerBuildingDTO): BuildingSpawnerService {
        
        const nexUnit: UnitGenericDTO = building.queueList[0];
        
        const buildingSpawnerService: BuildingSpawnerService = 
            this.buildingSpawnerServiceFactory.getBuildingSpawnerService(nexUnit.type);

        return buildingSpawnerService;
    }

    private spawnNextUnitInQueue(building: SpawnerBuildingDTO): void {
        const spawnerBuildingService = this.getBuildingSpawnerService(building);
        const unit: UnitGenericDTO = 
            spawnerBuildingService.spawnNexUnitInQueue(building, this.gameLogicTimeFrameService.getElapsedTime());

        const buildingRemovedUnitFromQueueEvent: BuildingRemovedUnitFromQueueEvent = new BuildingRemovedUnitFromQueueEvent(unit);
        this.gameEventBusService.cast(buildingRemovedUnitFromQueueEvent);
        
        const buildingSpawningUnitEvent: BuildingSpawningUnitEvent = new BuildingSpawningUnitEvent(
            unit,
            <number>building.unitSpawning.spawnFinish,
            <number>building.unitSpawning.spawnStart);
        this.gameEventBusService.cast(buildingSpawningUnitEvent);
    }
}