import { MapPathfindingGridRepository } from '../repositories/map-pathfinding-grid-repository.service';
import { MapDTO } from '../model/map.dto';
import { MapPathfindingGrid } from '../model/map-pathfinding-grid.entity';
import { MapPathFindingGridGenerator } from './map-pathfinding-grid-generator.service';
import { js as EasyStar } from 'easystarjs';
import { TileType } from '../model/tile-type.enum';
import { PathFindingCoordinate } from '../model/path-finding-coordinate.dto';
import { CoordinatesEntity } from '../model/coordinates.entity';

export class PathFindingManagerService {

    private pathfinder: EasyStar;

    constructor(
        private readonly mapPathfindingGridRepository: MapPathfindingGridRepository,
    ) {
        this.pathfinder = new EasyStar();
        this.pathfinder.setAcceptableTiles([TileType.Grass, TileType.Sand]);
        this.pathfinder.enableDiagonals();
        this.pathfinder.disableCornerCutting();
        this.pathfinder.setIterationsPerCalculation(10);
    }

    generateGrid(map: MapDTO): void {
        const mapPathfindingGrid: MapPathfindingGrid = MapPathFindingGridGenerator.generateGrid(map);
        this.mapPathfindingGridRepository.saveGrid(mapPathfindingGrid);
        this.pathfinder.setGrid(mapPathfindingGrid.tilesMap);
    }

    blockTile(xCoordinate: number, yCoordinate: number): void {
        this.mapPathfindingGridRepository.blockTile(xCoordinate, yCoordinate);
        this.pathfinder.avoidAdditionalPoint(xCoordinate, yCoordinate);
    }

    
    findPath(from: CoordinatesEntity, to: CoordinatesEntity): Promise<PathFindingCoordinate[]> {

        const pathFound: Promise<PathFindingCoordinate[]>  = new Promise((resolve, reject) => {
            this.pathfinder.findPath(
                from.xCoordinate,
                from.yCoordinate,
                to.xCoordinate,
                to.yCoordinate,
                (rawPath) => {
                    const path: PathFindingCoordinate[] = [];
                    for (const rawCoordinate of rawPath) {
                        const pathCoordinate: PathFindingCoordinate = {
                            xCoordinate: rawCoordinate.x,
                            yCoordinate: rawCoordinate.y,
                            time : null
                        }
                        path.push(pathCoordinate);
                    }
                    resolve(path);
            });
        });
    
        return pathFound;
    }

    calculatePathFinding(): void {
        this.pathfinder.calculate();
    }

}