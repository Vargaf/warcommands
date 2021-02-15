import { MapDTO } from '../model/map.dto';
import { MapPathfindingGrid } from '../model/map-pathfinding-grid.entity';

export class MapPathFindingGridGenerator {

    static generateGrid(map: MapDTO): MapPathfindingGrid {
        const grid: MapPathfindingGrid = {
            tilesMap: []
        };

        for (const tile of map.tiles) {

            if (grid.tilesMap[tile.yCoordinate] === undefined) {
                grid.tilesMap[tile.yCoordinate] = [];
            }

            grid.tilesMap[tile.yCoordinate][tile.xCoordinate] = tile.type;
        }

        return grid;
    }

}
