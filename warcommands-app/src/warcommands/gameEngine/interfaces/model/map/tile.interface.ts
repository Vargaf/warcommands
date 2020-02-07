import { TileTypeEnum } from './tileType.enum';
import { CoordinatesInterface } from './coordinates.interface';

export interface TileInterface extends CoordinatesInterface {
    type: TileTypeEnum;
}
