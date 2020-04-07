import { MapPathfindingGridRepository } from '../repositories/map-pathfinding-grid-repository.service';
import { MapDTO } from '../model/map.dto';
import { MapPathfindingGrid } from '../model/map-pathfinding-grid.entity';
import { MapPathFindingGridGenerator } from './map-pathfinding-grid-generator.service';

export class PathFindingManagerService {

    constructor(
        private readonly mapPathfindingGridRepository: MapPathfindingGridRepository,
    ) {}

    generateGrid(map: MapDTO): void {
        const mapPathfindingGrid: MapPathfindingGrid = MapPathFindingGridGenerator.generateGrid(map);
        this.mapPathfindingGridRepository.saveGrid(mapPathfindingGrid);
    }

}