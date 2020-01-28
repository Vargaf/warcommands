import { TileType } from './tileType.enum';

export interface TileEntity {
    xCoordinate: number;
    yCoordinate: number;
    type: TileType;
}
