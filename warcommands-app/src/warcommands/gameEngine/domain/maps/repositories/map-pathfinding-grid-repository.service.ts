import { MapPathfindingGrid } from '../model/map-pathfinding-grid.entity';

export abstract class MapPathfindingGridRepository {

    abstract saveGrid(grid: MapPathfindingGrid): void;

    abstract getGrid(): MapPathfindingGrid;

}
