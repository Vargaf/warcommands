import { CoordinatesEntity } from '../map/coordinates.entity';
import { BuildingTypeEnum } from './building-type.enum';
import { SpawnerDTO } from './spawner.dto';

export interface BuildingDTO extends CoordinatesEntity {
    id: string | null;
    type: BuildingTypeEnum;
    sizeWidth: number;
    sizeHeight: number;
    playerId: string | null;
}

export interface SpawnerBuildingDTO extends BuildingDTO, SpawnerDTO {}
