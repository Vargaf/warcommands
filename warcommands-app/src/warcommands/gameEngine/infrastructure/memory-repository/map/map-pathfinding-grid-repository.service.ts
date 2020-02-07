import { MapPathfindingGridRepository } from 'src/warcommands/gameEngine/domain/maps/repositories/map-pathfinding-grid-repository.service';
import { MapPathfindingGrid } from 'src/warcommands/gameEngine/domain/maps/model/map-pathfinding-grid.entity';

export class MapPathfindingGridRepositoryService implements MapPathfindingGridRepository {

    private grid: MapPathfindingGrid;

    saveGrid(grid: MapPathfindingGrid): void {
        this.grid = grid;
    }

    getGrid(): MapPathfindingGrid {
        return this.grid;
    }

}
