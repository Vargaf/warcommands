import { MapEntity } from '../model/map.entity';
import { MapInterface } from 'src/warcommands/gameEngine/interfaces/model/map/map.interface';
import { TileInterface } from 'src/warcommands/gameEngine/interfaces/model/map/tile.interface';
import { TileTypeEnum } from 'src/warcommands/gameEngine/interfaces/model/map/tileType.enum';
import { TileType } from '../model/tileType.enum';
import { Injectable } from "@angular/core";

@Injectable()
export class MapToResponseTranslatorService {

    static translsate(map: MapEntity): MapInterface {
        const translatedMap: MapInterface = {
            tiles: [],
            size: {
                width: 0,
                height: 0
            }
        };

        for (const tile of map.tiles) {

            const translatedTileType: TileTypeEnum = TileTypeEnum[TileType[tile.type]];

            const translatedTyle: TileInterface = {
                xCoordinate: tile.xCoordinate,
                yCoordinate: tile.yCoordinate,
                type: translatedTileType
            };

            translatedMap.tiles.push(translatedTyle);
        }

        translatedMap.size.width = map.size.width;
        translatedMap.size.height = map.size.height;

        return translatedMap;
    }
}
