import { BuildingTypeEnum } from './building-type.enum';
import { CoordinatesEntity } from '../../share/model/coordinates.entity';
import { SpawnerDTO } from './spawner.dto';

export interface BuildingDTO extends CoordinatesEntity {
    id: string;
    type: BuildingTypeEnum;
    sizeWidth: number;
    sizeHeight: number;
    playerId: string;
}

export interface SpawnerBuildingDTO extends BuildingDTO, SpawnerDTO {}
