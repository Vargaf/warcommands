import { BuildingDTO as ResponseBuildingDTO } from '../gameEngine/domain/building/model/building.dto';
import { BuildingDTO } from '../basic-mode/domain/building/model/building.dto';
import { BuildingTypeEnum } from '../basic-mode/domain/building/model/building-type.enum';
import { BaseBuildingDTO } from '../gameEngine/domain/building/base/base-building.dto';
import { BaseEntityInterface } from '../basic-mode/domain/building/base/base-entity-interface';
import { MatterFarmBuildingDTO as ResponseMatterFarmBuildingDTO } from '../gameEngine/domain/building/matter-farm/matter-farm-building.dto';
import { MatterFarmBuildingDTO } from '../basic-mode/domain/building/matter-farm/matter-farm-building.dto';
import { EnergyFarmBuildingDTO as ResponseEnergyFarmBuildingDTO } from '../gameEngine/domain/building/energy-farm/energy-farm-building.dto';
import { EnergyFarmBuildingDTO } from '../basic-mode/domain/building/energy-farm/energy-farm-building.dto';
import { UnitGenericDTO } from '../basic-mode/domain/units/model/unit-generic.dto';

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

    private static translateBaseBuilding(responseBuilding: BaseBuildingDTO): BaseEntityInterface {
        const base: BaseEntityInterface = {
            type: BuildingTypeEnum.Base,
            name: responseBuilding.name,
            queueList: <UnitGenericDTO[]>responseBuilding.queueList,
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