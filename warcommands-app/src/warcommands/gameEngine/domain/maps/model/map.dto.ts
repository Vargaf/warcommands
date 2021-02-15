import { TileDTO } from './tile.dto';

export interface MapDTO {
    tiles: TileDTO[];
    size: {
        width: number,
        height: number
    };
}
