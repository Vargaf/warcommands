import { BlockedTileRepository } from '../repositories/blocked-tile-repository.service';
import { TilePathfindingType } from '../../maps/model/tile-pathfinding-type.enum';
import { BuildingDTO } from '../model/building.dto';
import { MapConfiguration } from '../../maps/model/map-configuration.interface';
import { IsBlockedTileHelper } from './is-blocked-tile-helper';
import { BuildingCreatedEventFactoryService } from './building-created-event-factory.service';
import { BuildingsRepositoryService } from './buildings-repository.service';

export class BuildingsManagerService {

    constructor(
        private readonly blockedTileRepository: BlockedTileRepository,
        private readonly buildingCreatedEventFactoryService: BuildingCreatedEventFactoryService,
        private readonly buildingsRepositoryService: BuildingsRepositoryService
    ) {}

    initializeFromMap(map: MapConfiguration): void {
        for (let row = 0; row < map.size.height; row++) {
            for (let col = 0; col < map.size.width; col++) {
                const tileType: TilePathfindingType = map.tiles[row][col];
                if (IsBlockedTileHelper.check(tileType)) {
                    this.blockedTileRepository.save(col, row);
                }
            }
        }
    }

    addBuilding(building: BuildingDTO): void {
        const xCoordinateStart = building.xCoordinate - 1;
        const xCoordinateEnd = building.xCoordinate + building.sizeWidth;
        const yCoordinateStart = building.yCoordinate - 1;
        const yCoordinateEnd = building.yCoordinate + building.sizeHeight;

        for (let y = yCoordinateStart; y <= yCoordinateEnd; y++ ) {
            for (let x = xCoordinateStart; x <= xCoordinateEnd; x++) {
                this.blockedTileRepository.save(x, y);
            }
        }

        this.buildingsRepositoryService.save(building);
        this.buildingCreatedEventFactoryService.cast(building);
    }

}