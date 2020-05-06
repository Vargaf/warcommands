import { BuildingBlockedTileRepository } from '../repositories/building-blocked-tile-repository.service';
import { UnitBlockedTileRepositoryService } from '../repositories/unit-blocked-tile-repository.service';
import { MapConfiguration } from '../model/map-configuration.interface';
import { TilePathfindingType } from '../model/tile-pathfinding-type.enum';
import { IsTileBlockedToBuildHelper } from '../../building/services/is-tile-blocked-to-build-helper';
import { IsTileBlockedToUnitsHelper } from '../../building/services/is-tile-blocked-to-units-helper';
import { BuildingDTO } from '../../building/model/building.dto';
import { UnitGenericDTO } from '../../units/model/unit-generic.dto';
import { PathFindingManagerService } from './path-finding-manager.service';

export class MapBlockedTilesManagerService {

    constructor(
        private readonly buildingBlockedTileRepository: BuildingBlockedTileRepository,
        private readonly unitBlockedTileRepository: UnitBlockedTileRepositoryService,
        private readonly pathFindingManager: PathFindingManagerService
    ) {}

    initializeFromMap(map: MapConfiguration): void {
        for (let row = 0; row < map.size.height; row++) {
            for (let col = 0; col < map.size.width; col++) {
                const tileType: TilePathfindingType = map.tiles[row][col];
                if (IsTileBlockedToBuildHelper.check(tileType)) {
                    this.buildingBlockedTileRepository.save(col, row);
                }

                if (IsTileBlockedToUnitsHelper.check(tileType)) {
                    this.unitBlockedTileRepository.addTileBlocked(col, row);
                }
            }
        }
    }

    blockTilesFromBuilding(building: BuildingDTO): void {
        this.addBuildingBlockedTilesFromBuilding(building);
        this.addUnitBlockedTilesFromBuilding(building);
        this.addPathfindingBlockedTilesFromBuilding(building);
    }

    blockTilesFromUnit(unit: UnitGenericDTO): void {
        this.unitBlockedTileRepository.addUnit(unit);
    }

    freeTileByUnit(unit: UnitGenericDTO): void {
        this.unitBlockedTileRepository.removeUnit(unit);
    }

    isTileOccupiedByUnit(xCoordinate: number, yCoordinate: number): boolean {
        return this.unitBlockedTileRepository.isBlocked(xCoordinate, yCoordinate);
    }

    private addBuildingBlockedTilesFromBuilding(building: BuildingDTO): void {
        const xCoordinateStart = building.xCoordinate - 1;
        const xCoordinateEnd = building.xCoordinate + building.sizeWidth;
        const yCoordinateStart = building.yCoordinate - 1;
        const yCoordinateEnd = building.yCoordinate + building.sizeHeight;

        for (let y = yCoordinateStart; y <= yCoordinateEnd; y++ ) {
            for (let x = xCoordinateStart; x <= xCoordinateEnd; x++) {
                this.buildingBlockedTileRepository.save(x, y);
            }
        }
    }

    private addUnitBlockedTilesFromBuilding(building: BuildingDTO): void {
        const xCoordinateStart = building.xCoordinate;
        const xCoordinateEnd = building.xCoordinate + building.sizeWidth;
        const yCoordinateStart = building.yCoordinate;
        const yCoordinateEnd = building.yCoordinate + building.sizeHeight;

        for (let y = yCoordinateStart; y < yCoordinateEnd; y++ ) {
            for (let x = xCoordinateStart; x < xCoordinateEnd; x++) {
                this.unitBlockedTileRepository.addTileBlocked(x, y);
            }
        }
    }

    private addPathfindingBlockedTilesFromBuilding(building: BuildingDTO): void {
        const xCoordinateStart = building.xCoordinate;
        const xCoordinateEnd = building.xCoordinate + building.sizeWidth;
        const yCoordinateStart = building.yCoordinate;
        const yCoordinateEnd = building.yCoordinate + building.sizeHeight;

        for (let y = yCoordinateStart; y < yCoordinateEnd; y++ ) {
            for (let x = xCoordinateStart; x < xCoordinateEnd; x++) {
                this.pathFindingManager.blockTile(x, y);
            }
        }
    }

}