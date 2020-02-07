import { MapPathfindingGridRepositoryService } from '../../memory-repository/map/map-pathfinding-grid-repository.service';
import { NonBuildingTileRepositoryService } from '../../memory-repository/build/non-building-tile-repository.service';
import { BuildPlaceManagerService } from 'src/warcommands/gameEngine/domain/build/services/build-place-manager.service';

const factory = (
    mapPathFindingGridRepository: MapPathfindingGridRepositoryService,
    nonBuildingTileRepository: NonBuildingTileRepositoryService
    ) => {
    return new BuildPlaceManagerService(mapPathFindingGridRepository, nonBuildingTileRepository);
};

export const provider = {
    provide: BuildPlaceManagerService,
    useFactory: factory,
    deps: [
        MapPathfindingGridRepositoryService,
        NonBuildingTileRepositoryService
    ]
};