import { MapPathfindingGridRepository } from '../repositories/map-pathfinding-grid-repository.service';
import { MapDTO } from '../model/map.dto';
import { MapPathfindingGrid } from '../model/map-pathfinding-grid.entity';
import { MapPathFindingGridGenerator } from './map-pathfinding-grid-generator.service';
import { js as EasyStar } from 'easystarjs';
import { UnitActionMoveToDTO } from '../../units/unit-actions/unit-action-move-to.dto';
import { TileType } from '../model/tile-type.enum';
import { UnitGenericDTO } from '../../units/model/unit-generic.dto';
import { UnitActionTypeENUM } from '../../units/unit-actions/unit-action-type.enum';
import { Subject, Observable } from 'rxjs';
import { PathFindingCoordinate } from '../model/path-finding-coordinate.dto';

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

    
    findPath(action: UnitActionMoveToDTO): Observable<PathFindingCoordinate[]> {

        const pathFound: Subject<PathFindingCoordinate[]> = new Subject<PathFindingCoordinate[]>();
    
        this.pathfinder.findPath(
            action.data.from.xCoordinate,
            action.data.from.yCoordinate,
            action.data.to.xCoordinate,
            action.data.to.yCoordinate,
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
                pathFound.next(path);
        });
    
        return pathFound;
    }

    calculatePathFinding(): void {
        this.pathfinder.calculate();
    }

}