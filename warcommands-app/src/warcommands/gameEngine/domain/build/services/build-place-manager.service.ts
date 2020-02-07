import { MapPathfindingGridRepository } from 'src/warcommands/gameEngine/domain/maps/repositories/map-pathfinding-grid-repository.service';
import { NonBuildingTileRepository } from '../repositories/non-building-tile-repository.service';
import { MapPathfindingGrid } from '../../maps/model/map-pathfinding-grid.entity';
import { TilePathfindingType } from '../../maps/model/tile-pathfinding-type.enum';
import { BuildEntity } from '../model/build.entity';

export class BuildPlaceManagerService {

    constructor(
        private mapPathFindingGridRepository: MapPathfindingGridRepository,
        private nonBuildingTileRepository: NonBuildingTileRepository
    ) {}

    initializeFromPathfindingGrid(): void {
        this.nonBuildingTileRepository.clear();

        const mapGrid: MapPathfindingGrid = this.mapPathFindingGridRepository.getGrid();

        for (let y = 0; y < mapGrid.tilesMap.length; y++) {
            for (let x = 0; x < mapGrid.tilesMap[y].length; x++) {
                if (this.isNonBuildingTile(mapGrid.tilesMap[y][x])) {
                    this.nonBuildingTileRepository.addNonBuildingTile(x, y);
                }
            }
        }
    }

    addBuilding(building: BuildEntity): void {
        const xCoordinateStart = building.xCoordinate - 1;
        const xCoordinateEnd = building.xCoordinate + building.sizeWidth;
        const yCoordinateStart = building.yCoordinate - 1;
        const yCoordinateEnd = building.yCoordinate + building.sizeHeight;

        for (let y = yCoordinateStart; y <= yCoordinateEnd; y++ ) {
            for (let x = xCoordinateStart; x <= xCoordinateEnd; x++) {
                this.nonBuildingTileRepository.addNonBuildingTile(x, y);
            }
        }
    }

    private isNonBuildingTile(tile: number): boolean {
        let isNonBuildingTile = true;

        switch (tile) {
            case TilePathfindingType.Grass: {
                isNonBuildingTile = false;
                break;
            }
            case TilePathfindingType.Sand: {
                isNonBuildingTile = false;
                break;
            }
        }

        return isNonBuildingTile;
    }

}