import { MapPathfindingGrid } from '../model/map-pathfinding-grid.entity';

export abstract class MapPathfindingGridRepository {

    abstract saveGrid(grid: MapPathfindingGrid): void;

    abstract getGrid(): MapPathfindingGrid;

    abstract blockTile(xCoordinate: number, yCoordinate: number): void;

    abstract freeTile(xCoordinate: number, yCoordinate: number): void;

}
