import { MapEntity } from '../model/map.entity';
import { MapPathfindingGrid } from '../model/map-pathfinding-grid.entity';

export class MapPathFindingGridGenerator {

    static generateGrid(map: MapEntity): MapPathfindingGrid {
        const grid: MapPathfindingGrid = {
            tilesMap: []
        };

        for (const tile of map.tiles) {

            if (grid.tilesMap[tile.xCoordinate] === undefined) {
                grid.tilesMap[tile.xCoordinate] = [];
            }

            grid.tilesMap[tile.yCoordinate][tile.xCoordinate] = tile.type;
        }

        return grid;
    }

}
