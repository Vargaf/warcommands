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

    private isTileOccupiedByUnit(tileCoordinates: CoordinatesEntity): boolean {
        return this.unitBlockedTileRepository.isBlocked(tileCoordinates.xCoordinate, tileCoordinates.yCoordinate);
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
        let freeTileFound = false;
        const freeTile: CoordinatesEntity = {
            xCoordinate: origin.xCoordinate,
            yCoordinate: offset + origin.yCoordinate
        };

        if(this.isTileAvailable(freeTile)) {
            freeTileFound = true;
        } else {
            for(let xPosition = 1; xPosition <= offset; xPosition++) {
                freeTile.xCoordinate = origin.xCoordinate - xPosition;
                freeTile.yCoordinate = offset + origin.yCoordinate;
                if(this.isTileAvailable(freeTile)) {
                    freeTileFound = true;
                    break;
                } else {
                    freeTile.xCoordinate = origin.xCoordinate + xPosition;
                    freeTile.yCoordinate = offset + origin.yCoordinate;
                    if(this.isTileAvailable(freeTile)) {
                        freeTileFound = true;
                        break;
                    }
                }
            }
        }

        if(freeTileFound) {
            return freeTile;
        } else {
            return null;
        }
    }

    private getFreeSideTileCoordinates(offset: number, origin: CoordinatesEntity): CoordinatesEntity | null {
        let freeTileFound = false;
        const yMaxPosition = offset -1;
        const yMinPosition = -yMaxPosition;
        const freeTile: CoordinatesEntity = {
            xCoordinate: 0,
            yCoordinate: 0
        };

        for(let yPosition = yMaxPosition; yPosition >= yMinPosition; yPosition--) {
            
            freeTile.xCoordinate = origin.xCoordinate - offset;
            freeTile.yCoordinate = origin.yCoordinate + yPosition;
            if(this.isTileAvailable(freeTile)) {
                freeTileFound = true;
                break;
            } else {
                freeTile.xCoordinate = origin.xCoordinate + offset;
                freeTile.yCoordinate = origin.yCoordinate + yPosition;
                if(this.isTileAvailable(freeTile)) {
                    freeTileFound = true;
                    break;
                }
            }
        }

        if(freeTileFound) {
            return freeTile;
        } else {
            return null;
        }
    }

    private getFreeTopTileCoordinates(offset: number, origin: CoordinatesEntity): CoordinatesEntity | null {
        let freeTileFound = false;
        const freeTile: CoordinatesEntity = {
            xCoordinate: 0,
            yCoordinate: 0
        };

        for(let xPosition = offset; xPosition > 0; xPosition--) {
            freeTile.xCoordinate = origin.xCoordinate - xPosition;
            freeTile.yCoordinate = origin.yCoordinate - offset;
            if(this.isTileAvailable(freeTile)) {
                freeTileFound = true;
                break;
            } else {
                freeTile.xCoordinate = origin.xCoordinate + xPosition;
                freeTile.yCoordinate = origin.yCoordinate - offset;
                if(this.isTileAvailable(freeTile)) {
                    freeTileFound = true;
                    break;
                }
            }
        }

        if(!freeTileFound) {
            freeTile.xCoordinate = origin.xCoordinate;
            freeTile.yCoordinate = origin.yCoordinate - offset;
            if(this.isTileAvailable(freeTile)) {
                freeTileFound = true;
            }
        }

        if(freeTileFound) {
            return freeTile;
        } else {
            return null;
        }
    }

    private isTileAvailable(tileCoordinates: CoordinatesEntity): boolean {
        return this.isTileInsideMapBoundaries(tileCoordinates) &&
            !this.isTileOccupiedByUnit(tileCoordinates);
    }

}