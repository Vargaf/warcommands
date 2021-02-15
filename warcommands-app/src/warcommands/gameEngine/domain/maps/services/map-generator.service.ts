import { MapDTO } from '../model/map.dto';
import { TileDTO } from '../model/tile.dto';
import { TileType } from '../model/tile-type.enum';
import { MapConfiguration } from '../model/map-configuration.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class MapGeneratorService {

    generateMap(mapConfiguration: MapConfiguration): MapDTO {
        const tiles = this.buildTiles(mapConfiguration);
        return {
            tiles,
            size: {
                width: mapConfiguration.size.width,
                height: mapConfiguration.size.height
            }
        };
    }

    private buildTiles(mapConfiguration: MapConfiguration): TileDTO[] {
        const tileList: TileDTO[] = [];

        for (let row = 0; row < mapConfiguration.size.height; row++) {
            for (let col = 0; col < mapConfiguration.size.width; col++) {
                const tileType: TileType = mapConfiguration.tiles[row][col];
                const tile: TileDTO = {
                    xCoordinate: col,
                    yCoordinate: row,
                    type: tileType
                };

                tileList.push(tile);
            }
        }

        return tileList;
    }
}
