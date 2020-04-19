import { InMemoryBuildingBlockedTileRepositoryService } from '../../../memory-repository/map/in-memory-building-blocked-tile-repository.service';
import { BuildingsManagerService } from 'src/warcommands/gameEngine/domain/building/services/buildings-manager.service';
import { BuildingCreatedEventFactoryService } from 'src/warcommands/gameEngine/domain/building/services/building-created-event-factory.service';
import { InMemoryBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-buildings-repository.service';
import { InMemorySpawningBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-spawning-buildings-repository.service';
import { MapBlockedTilesManagerService } from 'src/warcommands/gameEngine/domain/maps/services/map-blocked-tiles-manager.service';

const factory = (
    buildingCreatedEventFactoryService: BuildingCreatedEventFactoryService,
    buildingsRepositoryService: InMemoryBuildingsRepositoryService,
    spawningBuildingsRepositoryService: InMemorySpawningBuildingsRepositoryService,
    mapBlockedTilesManagerService: MapBlockedTilesManagerService
    ) => {
    return new BuildingsManagerService(
        buildingCreatedEventFactoryService,
        buildingsRepositoryService,
        spawningBuildingsRepositoryService,
        mapBlockedTilesManagerService
        );
};

export const provider = {
    provide: BuildingsManagerService,
    useFactory: factory,
    deps: [
        BuildingCreatedEventFactoryService,
        InMemoryBuildingsRepositoryService,
        InMemorySpawningBuildingsRepositoryService,
        MapBlockedTilesManagerService
    ]
};