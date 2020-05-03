import { UnitsToCreateRepositoryService } from '../../units/services/units-to-create-repository.service';
import { UnitToCreateOnBuildingDTO } from '../../units/model/unit-to-create-on-building.dto';
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

export class EnqueueUnitsManagerService {

    constructor(
        private readonly unitsToCreateRepositoryService: UnitsToCreateRepositoryService,
        private readonly buildingSpawnerServiceFactory: BuildingSpawnerServiceFactory,
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly gameLogicTimeFrameService: GameLogicTimeFrameService,
        private readonly gameEventBusService: GameEventBusService,
        private readonly spawningBuildngsRepositoryService: SpawingBuildingsRepositoryservice,
    ) {}

    enqueueUnits(): void {
        const unitList: UnitToCreateOnBuildingDTO[] = this.unitsToCreateRepositoryService.getAll();

        for (const unitToCreate of unitList) {
            const buildingSpawnerService: BuildingSpawnerService = 
                this.buildingSpawnerServiceFactory.getBuildingSpawnerService(unitToCreate.unitType);

            let spawnerBuilding: SpawnerBuildingDTO = (this.buildingsRepositoryService.findById(unitToCreate.buildingId) as SpawnerBuildingDTO);
            const playerBase: BaseBuildingDTO = (this.buildingsRepositoryService.findById(spawnerBuilding.baseId) as BaseBuildingDTO);
            const unitCost: ResourcesDTO = buildingSpawnerService.getUnitCost(unitToCreate.unitType);

            if (this.hasBaseEnoughResources(playerBase, unitCost)) {
                if (buildingSpawnerService.hasSpawnerBuildingQueueRoom(spawnerBuilding)) {
                    const unit: UnitGenericDTO = buildingSpawnerService.createUnit(spawnerBuilding);

                    if (!buildingSpawnerService.isSpawnerBuildingAlreadySpawning(spawnerBuilding)) {
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
                    } else {
                        playerBase.resources.matter -= unitCost.matter;
                        playerBase.resources.energy -= unitCost.energy;
                        this.buildingsRepositoryService.save(playerBase);
                    }
                    
                    this.buildingsRepositoryService.save(spawnerBuilding);
                    this.spawningBuildngsRepositoryService.save(spawnerBuilding.id);
                }
            }
            this.unitsToCreateRepositoryService.remove(unitToCreate);
        }
    }

    private hasBaseEnoughResources(base: BaseBuildingDTO, unitCost: ResourcesDTO): boolean {
        return base.resources.energy >= unitCost.energy &&
            base.resources.matter >= unitCost.matter;
    }

}