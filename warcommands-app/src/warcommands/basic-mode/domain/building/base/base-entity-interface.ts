import { BuildingDTO, SpawnerBuildingDTO } from '../model/building.dto';
import { BuildingTypeEnum } from '../model/building-type.enum';
import { CoordinatesEntity } from '../../share/model/coordinates.entity';
import { UnitGenericDTO } from '../../units/model/unit-generic.dto';
import { SpawnerDTO } from '../model/spawner.dto';

export interface BaseEntityInterface extends SpawnerBuildingDTO {
    type: BuildingTypeEnum;
    name: string;
    resources: {
        matter: number;
        energy: number;
    }
}
