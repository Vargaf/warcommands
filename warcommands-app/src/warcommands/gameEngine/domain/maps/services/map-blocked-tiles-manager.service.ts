import { BuildingBlockedTileRepository } from '../repositories/building-blocked-tile-repository.service';
import { UnitBlockedTileRepositoryService } from '../repositories/unit-blocked-tile-repository.service';
import { MapConfiguration } from '../model/map-configuration.interface';
import { TilePathfindingType } from '../model/tile-pathfinding-type.enum';
import { IsTileBlockedToBuildHelper } from '../../building/services/is-tile-blocked-to-build-helper';
import { IsTileBlockedToUnitsHelper } from '../../building/services/is-tile-blocked-to-units-helper';
import { BuildingDTO } from '../../building/model/building.dto';
import { UnitGenericDTO } from '../../units/model/unit-generic.dto';
import { PathFindingManagerService } from './path-finding-manager.service';
import { CoordinatesEntity } from '../model/coordinates.entity';
import { BuildingTypeEnum } from '../../building/model/building-type.enum';

export class MapBlockedTilesManagerService {

    private selectedMap!: MapConfiguration;
    
    constructor(
        private readonly buildingBlockedTileRepository: BuildingBlockedTileRepository,
        private readonly unitBlockedTileRepository: UnitBlockedTileRepositoryService,
        private readonly pathFindingManager: PathFindingManagerService
    ) {}

    initializeFromMap(map: MapConfiguration): void {
        this.selectedMap = map;

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

    blockTileFromUnit(unit: UnitGenericDTO): void {
        this.unitBlockedTileRepository.addUnit(unit);
    }

    freeTileByUnit(unit: UnitGenericDTO): void {
        this.unitBlockedTileRepository.removeUnit(unit);
    }

    isTileOccupiedByAnotherUnit(unit: UnitGenericDTO): boolean {
        let isTileOccupied = false;
        const onTileUnitList = this.unitBlockedTileRepository.getUnitIdListBlokingTile(unit.xCoordinate, unit.yCoordinate);

        for(let otherUnitId of onTileUnitList) {
            if(otherUnitId !== unit.id) {
                isTileOccupied = true;
                break;
            }
        }

        return isTileOccupied;
    }

    getNearestFreeTile(origin: CoordinatesEntity): CoordinatesEntity {
        let freeTileCoordinates: CoordinatesEntity | null = null;
        let tileOffset = 1;
        
        do {
            freeTileCoordinates = this.getFreeBottomTileCoordinates(tileOffset, origin);
            if(!freeTileCoordinates) {
                freeTileCoordinates = this.getFreeSideTileCoordinates(tileOffset, origin);
            }
            if(!freeTileCoordinates) {
                freeTileCoordinates = this.getFreeTopTileCoordinates(tileOffset, origin);
            }

            tileOffset++;
        } while(!freeTileCoordinates)

        return freeTileCoordinates;
    }

    private isTileInsideMapBoundaries(tile: CoordinatesEntity): boolean {
        return 0 <= tile.xCoordinate && tile.xCoordinate < this.selectedMap.size.width &&
            0 <= tile.yCoordinate && tile.yCoordinate < this.selectedMap.size.height;
    }

    private isTileOccupiedByUnit(xCoordinate: number, yCoordinate: number): boolean {
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
        let xCoordinateStart = building.xCoordinate;
        let xCoordinateEnd = building.xCoordinate + building.sizeWidth;
        let yCoordinateStart = building.yCoordinate;
        let yCoordinateEnd = building.yCoordinate + building.sizeHeight;

        if(this.isAFarm(building)) {
            // To aviod having units stoped around the farms
            xCoordinateStart--;
            xCoordinateEnd++;
            yCoordinateStart--;
            yCoordinateEnd++;
        }

        for (let y = yCoordinateStart; y < yCoordinateEnd; y++ ) {
            for (let x = xCoordinateStart; x < xCoordinateEnd; x++) {
                this.unitBlockedTileRepository.addTileBlocked(x, y);
            }
        }
    }

    private isAFarm(building: BuildingDTO): boolean {
        return building.type === BuildingTypeEnum.EnergyFarm ||
            building.type === BuildingTypeEnum.MatterFarm;
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

    private getFreeBottomTileCoordinates(offset: number, origin: CoordinatesEntity): CoordinatesEntity | null {
        let xCoordinate = 0;
        let yCoordinate = 0;
        let freeTileFound = false;

        if(!this.isTileOccupiedByUnit(origin.xCoordinate, offset + origin.yCoordinate)) {
            xCoordinate = origin.xCoordinate;
            yCoordinate = offset + origin.yCoordinate;
            freeTileFound = true;
        } else {
            for(let xPosition = 1; xPosition <= offset; xPosition++) {
                if(!this.isTileOccupiedByUnit(origin.xCoordinate - xPosition, offset + origin.yCoordinate)) {
                    xCoordinate = origin.xCoordinate - xPosition;
                    yCoordinate = offset + origin.yCoordinate;
                    freeTileFound = true;
                    break;
                } else if(!this.isTileOccupiedByUnit(origin.xCoordinate + xPosition, offset + origin.yCoordinate)) {
                    xCoordinate = origin.xCoordinate + xPosition;
                    yCoordinate = origin.yCoordinate + offset;
                    freeTileFound = true;
                    break;
                }
            }
        }

        const freeTile: CoordinatesEntity = {
            xCoordinate,
            yCoordinate
        };

        if(freeTileFound && this.isTileInsideMapBoundaries(freeTile)) {
            return freeTile;
        } else {
            return null;
        }
    }

    private getFreeSideTileCoordinates(offset: number, origin: CoordinatesEntity): CoordinatesEntity | null {
        let xCoordinate = 0;
        let yCoordinate = 0;
        let freeTileFound = false;

        const yMaxPosition = offset -1;
        const yMinPosition = -yMaxPosition;

        for(let yPosition = yMaxPosition; yPosition >= yMinPosition; yPosition--) {
            if(!this.isTileOccupiedByUnit(origin.xCoordinate - offset, origin.yCoordinate + yPosition)) {
                xCoordinate = origin.xCoordinate - offset;
                yCoordinate = origin.yCoordinate + yPosition;
                freeTileFound = true;
                break;
            } else if(!this.isTileOccupiedByUnit(origin.xCoordinate + offset, origin.yCoordinate + yPosition)) {
                xCoordinate = origin.xCoordinate + offset;
                yCoordinate = origin.yCoordinate + yPosition;
                freeTileFound = true;
                break;
            }
        }

        const freeTile: CoordinatesEntity = {
            xCoordinate,
            yCoordinate
        };

        if(freeTileFound && this.isTileInsideMapBoundaries(freeTile)) {
            return freeTile;
        } else {
            return null;
        }
    }

    private getFreeTopTileCoordinates(offset: number, origin: CoordinatesEntity): CoordinatesEntity | null {
        let xCoordinate = 0;
        let yCoordinate = 0;
        let freeTileFound = false;

        for(let xPosition = offset; xPosition > 0; xPosition--) {
            if(!this.isTileOccupiedByUnit(origin.xCoordinate - xPosition, origin.yCoordinate - offset)) {
                xCoordinate = origin.xCoordinate - xPosition;
                yCoordinate = origin.yCoordinate - offset;
                freeTileFound = true;
                break;
            } else if(!this.isTileOccupiedByUnit(origin.xCoordinate + xPosition, origin.yCoordinate - offset)) {
                xCoordinate = origin.xCoordinate + xPosition;
                yCoordinate = origin.yCoordinate - offset;
                freeTileFound = true;
                break;
            }
        }

        if(!freeTileFound) {
            if(!this.isTileOccupiedByUnit(origin.xCoordinate, origin.yCoordinate - offset)) {
                xCoordinate = origin.xCoordinate;
                yCoordinate = origin.yCoordinate - offset;
                freeTileFound = true;
            }
        }

        const freeTile: CoordinatesEntity = {
            xCoordinate,
            yCoordinate
        };

        if(freeTileFound && this.isTileInsideMapBoundaries(freeTile)) {
            return freeTile;
        } else {
            return null;
        }
    }

}