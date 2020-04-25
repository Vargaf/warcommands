import { SpawingBuildingsRepositoryservice } from '../../building/services/spawning-buildings-repository.service';import { BuildingsRepositoryService } from '../../building/services/buildings-repository.service';import { GameLogicTimeFrameService } from './game-logic-time-frame.service';import { GameEventBusService } from '../../game-event-bus/services/game-event-bus.service';
import { MapBlockedTilesManagerService } from '../../maps/services/map-blocked-tiles-manager.service';
import { SpawnerBuildingDTO } from '../../building/model/building.dto';
import { UnitsRepositoryService } from '../../units/services/units-repository.service';
import { BuildingSpawnedUnitEvent } from '../events/building-spawned-unit.event';
import { BuildingSpawnerServiceFactory } from './building-spawner-service.factory';
import { BuildingSpawnerService } from '../../building/services/building-spawner.service';
import { UnitGenericDTO } from '../../units/model/unit-generic.dto';
import { BuildingSpawningUnitEvent } from '../events/building-spawning-unit.event';

export class SpawnUnitsManagerService {

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

                if (this.isSpawningSquareFree(building)) {
                    if (building.unitSpawning.spawnFinish < this.gameLogicTimeFrameService.getCurrentTime()) {
                        this.spawnUnit(building);

                        if (this.thereAreMoreUnitsInQueue(building)) {
                            this.spawnNextUnitInQueue(building);
                        } else {
                            this.spawningBuildngsRepositoryService.remove(buildingId);
                            console.log("Todos los minions creados");
                        }

                        this.buildingsRepositoryService.save(building);
                    }
                }
            }
        }
    }

    private isSpawningSquareFree(building: SpawnerBuildingDTO): boolean {
        const xCoordinate = building.xCoordinate + building.spawnRelativeCoordinates.xCoordinate;
        const yCoordinate = building.yCoordinate + building.spawnRelativeCoordinates.yCoordinate;

        return !this.mapBlockedTilesManagerService.isTileOccupiedByUnit(xCoordinate, yCoordinate);
    }

    private spawnUnit(building: SpawnerBuildingDTO): void {
        const unit = building.unitSpawning.unit;
        this.unitsRepositoryService.save(unit);

        building.unitSpawning.unit = null;
        building.unitSpawning.spawnFinish = 0;
        building.unitSpawning.spawnStart = 0;

        this.mapBlockedTilesManagerService.blockTilesFromUnit(unit);

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
            spawnerBuildingService.spawnNexUnitInQueue(building, this.gameLogicTimeFrameService.getCurrentTime());

        const event: BuildingSpawningUnitEvent = new BuildingSpawningUnitEvent(
            unit,
            building.unitSpawning.spawnFinish,
            building.unitSpawning.spawnStart);
        this.gameEventBusService.cast(event);
    }
}