import { TileInterface } from './tile.interface';

export interface MapInterface {
    tiles: TileInterface[];
    size: {
        width: number,
        height: number
    };
}
