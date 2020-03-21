import { MapEntity } from '../model/map.entity';
import { TileEntity } from '../model/tile.entity';
import { TileType } from '../model/tileType.enum';
import { MapConfiguration } from '../model/map-configuration.interface';
import { Injectable } from "@angular/core";

@Injectable()
export class MapGeneratorService {

    generateMap(mapConfiguration: MapConfiguration): MapEntity {
        const tiles = this.buildTiles(mapConfiguration);
        return {
            tiles,
            size: {
                width: mapConfiguration.size.width,
                height: mapConfiguration.size.height
            }
        };
    }

    private buildTiles(mapConfiguration: MapConfiguration): TileEntity[] {
        const tileList: TileEntity[] = [];

        for (let y = 0; y < mapConfiguration.tiles.length; y++) {
            for (let x = 0; x < mapConfiguration.tiles[y].length; x++) {
                const tileType: TileType = mapConfiguration.tiles[y][x];
                const tile: TileEntity = {
                    xCoordinate: x,
                    yCoordinate: y,
                    type: tileType
                };

                tileList.push(tile);
            }
        }

        return tileList;
    }
}
