import { BuildingDTO as ResponseBuildingDTO } from '../gameEngine/domain/building/model/building.dto';
import { BaseBuildingDTO } from '../gameEngine/domain/building/base/base-building.dto';
import { MatterFarmBuildingDTO as ResponseMatterFarmBuildingDTO } from '../gameEngine/domain/building/matter-farm/matter-farm-building.dto';
import { EnergyFarmBuildingDTO as ResponseEnergyFarmBuildingDTO } from '../gameEngine/domain/building/energy-farm/energy-farm-building.dto';
import { BuildingDTO } from './model/building/building.dto';
import { BuildingTypeEnum } from './model/building/building-type.enum';
import { BaseEntityDTO } from './model/building/base-entity.dto';
import { MatterFarmBuildingDTO } from './model/building/matter-farm-building.dto';
import { EnergyFarmBuildingDTO } from './model/building/energy-farm-building.dto';
import { UnitObjectTranslatorFactory } from './unit-object-translator.factory';

export class BuildingObjectTranslatorFactory {

    static translateBuildingType(responseBuilding: ResponseBuildingDTO): BuildingDTO {

        let building!: BuildingDTO;

        switch (responseBuilding.type) {
            case BuildingTypeEnum.Base: {
                building = BuildingObjectTranslatorFactory.translateBaseBuilding((responseBuilding as BaseBuildingDTO));
                break;
            }
            case BuildingTypeEnum.MatterFarm: {
                building = BuildingObjectTranslatorFactory.translateMatterFarmBuilding((responseBuilding as ResponseMatterFarmBuildingDTO));
                break;
            }
            case BuildingTypeEnum.EnergyFarm: {
                building = BuildingObjectTranslatorFactory.translateEnergyFarmBuilding((responseBuilding as ResponseEnergyFarmBuildingDTO));
                break;
            }
            default: {
                throw new Error('The building to translate does not exists: ' + responseBuilding.type);
            }
        }

        return building;

    }

    private static translateBaseBuilding(responseBuilding: BaseBuildingDTO): BaseEntityDTO {
        const base: BaseEntityDTO = {
            type: BuildingTypeEnum.Base,
            name: responseBuilding.name,
            queueList: UnitObjectTranslatorFactory.translateUnitListType(responseBuilding.queueList),
            spawnRelativeCoordinates: responseBuilding.spawnRelativeCoordinates,
            id: <string>responseBuilding.id,
            sizeHeight: responseBuilding.sizeHeight,
            sizeWidth: responseBuilding.sizeWidth,
            xCoordinate: responseBuilding.xCoordinate,
            yCoordinate: responseBuilding.yCoordinate,
            playerId: <string>responseBuilding.playerId,
            resources: {
                matter: responseBuilding.resources.matter,
                energy: responseBuilding.resources.energy
            },
            unitSpawning: {
                unit: null,
                spawnFinish: 0,
                spawnStart: 0
            }
        };

        return base;
    }

    private static translateMatterFarmBuilding(responseBuilding: ResponseMatterFarmBuildingDTO): MatterFarmBuildingDTO {
        const building: MatterFarmBuildingDTO = {
            type: BuildingTypeEnum.MatterFarm,
            id: <string>responseBuilding.id,
            sizeHeight: responseBuilding.sizeHeight,
            sizeWidth: responseBuilding.sizeWidth,
            xCoordinate: responseBuilding.xCoordinate,
            yCoordinate: responseBuilding.yCoordinate,
            playerId: <string>responseBuilding.playerId,
        };

        return building;
    }

    private static translateEnergyFarmBuilding(responseBuilding: ResponseEnergyFarmBuildingDTO): EnergyFarmBuildingDTO {
        const building: EnergyFarmBuildingDTO = {
            type: BuildingTypeEnum.EnergyFarm,
            id: <string>responseBuilding.id,
            sizeHeight: responseBuilding.sizeHeight,
            sizeWidth: responseBuilding.sizeWidth,
            xCoordinate: responseBuilding.xCoordinate,
            yCoordinate: responseBuilding.yCoordinate,
            playerId: <string>responseBuilding.playerId,
        };

        return building;
    }

}