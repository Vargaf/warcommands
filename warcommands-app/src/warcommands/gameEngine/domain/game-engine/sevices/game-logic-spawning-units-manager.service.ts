import { SpawingBuildingsRepositoryservice } from '../../building/services/spawning-buildings-repository.service';
import { BaseBuildingDTO } from '../../building/base/base-building.dto';
import { SpawnerBuildingDTO } from '../../building/model/building.dto';
import { UnitsRepositoryService } from '../units/services/units-repository.service';
import { GameEventBusService } from '../../game-event-bus/services/game-event-bus.service';
import { BaseSpawnedUnitEvent } from '../units/events/base-spawned-unit.event';
import { BuildingsRepositoryService } from '../../building/services/buildings-repository.service';
import { MinionConfiguration } from '../units/minion/minion-configuration';
import { BaseSpawningUnitEvent } from '../units/events/base-spawning-unit.event';

export class GameLogicSpawningUnitsManager {

    constructor(
        private readonly spawningBuildngsRepositoryService: SpawingBuildingsRepositoryservice,
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly gameEventBusService: GameEventBusService,
        private buildingsRepositoryService: BuildingsRepositoryService
    ) {}

    spawnUnits(): void {
        
        if(this.spawningBuildngsRepositoryService.countSpawingBuildings() > 0){
            const spawngBuildingsList = this.spawningBuildngsRepositoryService.getAll();

            const currentTime = (performance || Date ).now();

            for (let buildingId of spawngBuildingsList) {
                const building: SpawnerBuildingDTO = (this.buildingsRepositoryService.findById(buildingId) as SpawnerBuildingDTO);
                if (building.unitSpawning.spawnTime < currentTime) {
                    
                    this.spawnUnit(building);
                    this.spawnNexUnitInQueue(building);
                    this.buildingsRepositoryService.save(building);
                    
                    if(!this.isBuildingSpawning(building)) {
                        this.spawningBuildngsRepositoryService.remove(buildingId);
                        console.log("Todos los minions creados");
                    }
                }
            }
        }
        
    }

    private spawnUnit(building: SpawnerBuildingDTO): void {
        const unit = building.unitSpawning.unit;
        this.unitsRepositoryService.save(unit);

        building.unitSpawning.unit = null;
        building.unitSpawning.spawnTime = 0;

        const event: BaseSpawnedUnitEvent = new BaseSpawnedUnitEvent((building as BaseBuildingDTO), unit);
        this.gameEventBusService.cast(event);
    }

    private spawnNexUnitInQueue(building: SpawnerBuildingDTO): void {
        if (building.queueList.length > 0) {
            const unit = building.queueList.shift();
            building.unitSpawning.unit = unit;
            building.unitSpawning.spawnTime = (performance || Date ).now() + MinionConfiguration.spawnTime;

            const event: BaseSpawningUnitEvent = new BaseSpawningUnitEvent((building as BaseBuildingDTO), unit);
            this.gameEventBusService.cast(event);
        }
        
    }

    private isBuildingSpawning(building: SpawnerBuildingDTO): boolean {
        return building.unitSpawning.unit !== null;
    }

}