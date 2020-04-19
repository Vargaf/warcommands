import { MapBlockedTilesManagerService } from 'src/warcommands/gameEngine/domain/maps/services/map-blocked-tiles-manager.service';
import { InMemoryBuildingBlockedTileRepositoryService } from '../../../memory-repository/map/in-memory-building-blocked-tile-repository.service';
import { InMemoryUnitBlockedTileRepositoryService } from '../../../memory-repository/map/in-memory-unit-blocked-tile-repository.service';
import { InMemoryBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-buildings-repository.service';
import { InMemoryMapPathfindingGridRepositoryService } from '../../../memory-repository/map/in-memory-map-pathfinding-grid-repository.service';

const factory = (
    buildingBlockedTileRepository: InMemoryBuildingBlockedTileRepositoryService,
    unitBlockedTileRepository: InMemoryUnitBlockedTileRepositoryService,
    mapPathfindingGridRepository: InMemoryMapPathfindingGridRepositoryService,
) => {
    return new MapBlockedTilesManagerService(
        buildingBlockedTileRepository,
        unitBlockedTileRepository,
        mapPathfindingGridRepository
    );
};

export const provider = {
    provide: MapBlockedTilesManagerService,
    useFactory: factory,
    deps: [
        InMemoryBuildingsRepositoryService,
        InMemoryUnitBlockedTileRepositoryService,
        InMemoryMapPathfindingGridRepositoryService
    ]
};
