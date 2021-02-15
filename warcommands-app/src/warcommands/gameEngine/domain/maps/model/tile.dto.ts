import { TileType } from './tile-type.enum';
import { CoordinatesEntity } from './coordinates.entity';

export interface TileDTO extends CoordinatesEntity {
    type: TileType;
}
