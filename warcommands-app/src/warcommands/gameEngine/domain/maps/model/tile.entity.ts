import { TileType } from './tileType.enum';
import { CoordinatesEntity } from './coordinates.entity';

export interface TileEntity extends CoordinatesEntity {
    type: TileType;
}
