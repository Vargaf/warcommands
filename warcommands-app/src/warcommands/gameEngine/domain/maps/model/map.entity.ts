import { TileEntity } from './tile.entity';

export interface MapEntity {
    tiles: TileEntity[];
    size: {
        width: number,
        height: number
    };
}
