import { BuildingTypeEnum } from "src/warcommands/game-middleware/model/building/building-type.enum";
import { BuildingDTO, SpawnerBuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { BaseBuildingManagerService } from "./base-building-manager.service";
import { BuildingsRepositoryInterface } from "./buildings-repository.interface";
import { MatterFarmBuildingManagerService } from "./matter-farm-building-manager.service";
import { EnergyFarmBuildingManagerService } from "./energy-farm-building-manager.service";
import { ResourcesDTO } from "src/warcommands/game-middleware/model/resources/reources.dto";
import { BaseBuildingDTO } from "src/warcommands/game-middleware/model/building/base-building.dto";
import { UnitGenericDTO } from "src/warcommands/game-middleware/model/unit/unit-generic.dto";


export class BuildingsManagerService {
    
    constructor(
		private readonly baseBuildingManager: BaseBuildingManagerService,
        private readonly buildingsRepositoy: BuildingsRepositoryInterface,
        private readonly matterFarmBuildingManager: MatterFarmBuildingManagerService,
        private readonly energyFarmBuildingManager: EnergyFarmBuildingManagerService,
    ) {}

    addBuilding(building: BuildingDTO): void {

        this.buildingsRepositoy.save(building);

        if(building.type === BuildingTypeEnum.Base) {
            this.baseBuildingManager.addBase(building);
        }

        if(building.type === BuildingTypeEnum.MatterFarm) {
            this.matterFarmBuildingManager.addFarm(building);
        }

        if(building.type === BuildingTypeEnum.EnergyFarm) {
            this.energyFarmBuildingManager.addFarm(building);
        }
        
    }

    updateBaseResources(baseId: string, resources: ResourcesDTO): void {
        const base: BaseBuildingDTO = <BaseBuildingDTO>this.buildingsRepositoy.findOneById(baseId);
        base.resources = resources;
        this.buildingsRepositoy.save(base);
    }

    spawningUnit(unit: UnitGenericDTO, spawnFinish: number, spawnStart: number): void {
        const building: SpawnerBuildingDTO = <SpawnerBuildingDTO>this.buildingsRepositoy.findOneById(unit.spawnerBuildingId);
        building.unitSpawning = {
            unit,
            spawnFinish,
            spawnStart
        };
        this.buildingsRepositoy.save(building);

        if(building.type === BuildingTypeEnum.Base) {
            this.baseBuildingManager.spawnUnit(building);
        }
    }

    unitSpawned(unit: UnitGenericDTO): void {
        const building: SpawnerBuildingDTO = <SpawnerBuildingDTO>this.buildingsRepositoy.findOneById(unit.spawnerBuildingId);
        building.unitSpawning = {
            unit: null,
            spawnFinish: null,
            spawnStart: null
        };
        this.buildingsRepositoy.save(building);

        if(building.type === BuildingTypeEnum.Base) {
            this.baseBuildingManager.unitSpawned(unit, building);
        }
    }

    queueingUnit(unit: UnitGenericDTO): void {
        const building: SpawnerBuildingDTO = <SpawnerBuildingDTO>this.buildingsRepositoy.findOneById(unit.spawnerBuildingId);
        building.queueList.push(unit);
        this.buildingsRepositoy.save(building);

        if(building.type === BuildingTypeEnum.Base) {
            this.baseBuildingManager.addUnitToQueue(unit, building);
        }
    }

    buildingRemoveUnitFromQueue(unit: UnitGenericDTO): void {
        const building: SpawnerBuildingDTO = <SpawnerBuildingDTO>this.buildingsRepositoy.findOneById(unit.spawnerBuildingId);

        const unitIndex = building.queueList.findIndex((queuedUnit) => {
            return queuedUnit.id === unit.id;
        });

        building.queueList.splice(unitIndex, 1);
        this.buildingsRepositoy.save(building);

        if(building.type === BuildingTypeEnum.Base) {
            this.baseBuildingManager.removeUnitFromQueue(unit, building);
        }
    }

}