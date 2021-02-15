import { CoordinatesEntity } from '../../maps/model/coordinates.entity';
import { BuildingTypeEnum } from './building-type.enum';
import { SpawnerDTO } from './spawner.dto';

export interface BuildingDTO extends CoordinatesEntity {
    id: string;
    type: BuildingTypeEnum;
    sizeWidth: number;
    sizeHeight: number;
    playerId: string;
    baseId: string;
}

export interface SpawnerBuildingDTO extends BuildingDTO, SpawnerDTO {}
