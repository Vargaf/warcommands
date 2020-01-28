import { BasicMapConfiguration } from '../model/basic-map-configuration';
import { MapEntity } from '../model/map.entity';
import { TileEntity } from '../model/tile.entity';
import { TileType } from '../model/tileType.enum';

export class MapGeneratorService {

    generateBasicMap(): MapEntity {
        const basicMapConfiguration = BasicMapConfiguration;

        const basicMap: MapEntity = {
            tiles: []
        };

        for (let y = 0; y < basicMapConfiguration.length; y++) {
            for (let x = 0; x < basicMapConfiguration[y].length; x++) {
                const tileType: TileType = basicMapConfiguration[y][x];
                const tile: TileEntity = {
                    xCoordinate: x,
                    yCoordinate: y,
                    type: tileType
                };

                basicMap.tiles.push(tile);
            }
        }

        return basicMap;
    }

}
