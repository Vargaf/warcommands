import { MapPathfindingGridRepository } from 'src/warcommands/gameEngine/domain/maps/repositories/map-pathfinding-grid-repository.service';
import { MapPathfindingGrid } from 'src/warcommands/gameEngine/domain/maps/model/map-pathfinding-grid.entity';
import { TilePathfindingType } from 'src/warcommands/gameEngine/domain/maps/model/tile-pathfinding-type.enum';

export class InMemoryMapPathfindingGridRepositoryService implements MapPathfindingGridRepository {

    private grid: MapPathfindingGrid;

    private originalTileList: Map<string, number> = new Map<string, number>();

    saveGrid(grid: MapPathfindingGrid): void {
        this.grid = grid;
    }

    getGrid(): MapPathfindingGrid {
        return this.grid;
    }

    blockTile(xCoordinate: number, yCoordinate: number): void {
        const index = xCoordinate + ':' + yCoordinate;
        if(!this.originalTileList.has(index)) {
            const originalTile = this.grid.tilesMap[yCoordinate][xCoordinate];
            this.originalTileList.set(index, originalTile);
        }

        this.grid.tilesMap[yCoordinate][xCoordinate] = TilePathfindingType.Blocket;

    }

    freeTile(xCoordinate: number, yCoordinate: number): void {
        const index = xCoordinate + ':' + yCoordinate;
        const originalTile = this.originalTileList.get(index);
        this.grid.tilesMap[yCoordinate][xCoordinate] = originalTile;
        this.originalTileList.delete(index);
    }

}
