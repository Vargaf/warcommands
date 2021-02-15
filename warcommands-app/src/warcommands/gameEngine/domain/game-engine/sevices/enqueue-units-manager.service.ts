import { BuildingSpawnerServiceFactory } from './building-spawner-service.factory';
import { BuildingSpawnerService } from '../../building/services/building-spawner.service';
import { BuildingsRepositoryService } from '../../building/services/buildings-repository.service';
import { SpawnerBuildingDTO } from '../../building/model/building.dto';
import { GameLogicTimeFrameService } from './game-logic-time-frame.service';
import { ResourcesDTO } from '../../share/reources.dto';
import { BaseBuildingDTO } from '../../building/base/base-building.dto';
import { UnitGenericDTO } from '../../units/model/unit-generic.dto';
import { GameEventBusService } from '../../game-event-bus/services/game-event-bus.service';
import { BuildingSpawningUnitEvent } from '../events/building-spawning-unit.event';
import { BuildingQueueingUnitEvent } from '../events/building-queueing-unit.event';
import { SpawingBuildingsRepositoryservice } from '../../building/services/spawning-buildings-repository.service';
import { BuildingTypeEnum } from '../../building/model/building-type.enum';
import { BaseResourcesUpdateEvent } from '../events/base-resources-updated.event';
import { UnitTypeENUM } from '../../units/model/unit-type.enum';
import { UnitSpawningStatusENUM } from '../../units/model/unit-spawning-status.enum';
import { UnitsRepositoryService } from '../../units/services/units-repository.service';

export class EnqueueUnitsManagerService {

    constructor(
        private readonly buildingSpawnerServiceFactory: BuildingSpawnerServiceFactory,
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly gameLogicTimeFrameService: GameLogicTimeFrameService,
        private readonly gameEventBusService: GameEventBusService,
        private readonly spawningBuildngsRepositoryService: SpawingBuildingsRepositoryservice,
        private readonly unitsRepositoryService: UnitsRepositoryService
    ) {}

    enqueueUnit(unitType: UnitTypeENUM, buildingId: string): UnitGenericDTO {
        
        const buildingSpawnerService: BuildingSpawnerService = 
            this.buildingSpawnerServiceFactory.getBuildingSpawnerService(unitType);

        let unit: UnitGenericDTO = null;
        let spawnerBuilding: SpawnerBuildingDTO = (this.buildingsRepositoryService.findById(buildingId) as SpawnerBuildingDTO);
        const playerBase: BaseBuildingDTO = (this.buildingsRepositoryService.findById(spawnerBuilding.baseId) as BaseBuildingDTO);
        const unitCost: ResourcesDTO = buildingSpawnerService.getUnitCost(unitType);

        const isSpawningAvailable: boolean =
            this.hasBaseEnoughResources(playerBase, unitCost) &&
            buildingSpawnerService.hasSpawnerBuildingQueueRoom(spawnerBuilding);

        if (isSpawningAvailable) {

            unit = buildingSpawnerService.createUnit(spawnerBuilding);

            if (!buildingSpawnerService.isSpawnerBuildingAlreadySpawning(spawnerBuilding)) {
                unit.spawningStatus = UnitSpawningStatusENUM.Spawning;
                spawnerBuilding = buildingSpawnerService.startUnitSpawning(spawnerBuilding, unit, this.gameLogicTimeFrameService.getCurrentTime());
                const event = new BuildingSpawningUnitEvent(
                    unit,
                    spawnerBuilding.unitSpawning.spawnFinish,
                    spawnerBuilding.unitSpawning.spawnStart);
                this.gameEventBusService.cast(event);
            } else {
                spawnerBuilding = buildingSpawnerService.addUnitToSpawningQueue(spawnerBuilding, unit);
                const event = new BuildingQueueingUnitEvent(spawnerBuilding, unit);
                this.gameEventBusService.cast(event);
            }

            if (spawnerBuilding.type === BuildingTypeEnum.Base) {
                (spawnerBuilding as BaseBuildingDTO).resources.matter -= unitCost.matter;
                (spawnerBuilding as BaseBuildingDTO).resources.energy -= unitCost.energy;
                this.launchResourcesUpdateEvent(spawnerBuilding.id, (spawnerBuilding as BaseBuildingDTO).resources);
            } else {
                playerBase.resources.matter -= unitCost.matter;
                playerBase.resources.energy -= unitCost.energy;
                this.buildingsRepositoryService.save(playerBase);
                this.launchResourcesUpdateEvent(playerBase.id, playerBase.resources);
            }
            
            this.buildingsRepositoryService.save(spawnerBuilding);
            this.spawningBuildngsRepositoryService.save(spawnerBuilding.id);
            this.unitsRepositoryService.save(unit);
        }

        return unit;
    }

    private hasBaseEnoughResources(base: BaseBuildingDTO, unitCost: ResourcesDTO): boolean {
        return base.resources.energy >= unitCost.energy &&
            base.resources.matter >= unitCost.matter;
    }

    private launchResourcesUpdateEvent(baseId: string, resources: ResourcesDTO): void {
        const event: BaseResourcesUpdateEvent = new BaseResourcesUpdateEvent(baseId, resources);
        this.gameEventBusService.cast(event);
    }

}