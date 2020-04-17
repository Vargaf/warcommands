import { InMemoryBlockedTileRepositoryService } from '../../../memory-repository/build/in-memory-blocked-tile-repository.service';
import { BuildingsManagerService } from 'src/warcommands/gameEngine/domain/building/services/buildings-manager.service';
import { BuildingCreatedEventFactoryService } from 'src/warcommands/gameEngine/domain/building/services/building-created-event-factory.service';
import { InMemoryBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-buildings-repository.service';
import { InMemorySpawningBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-spawning-buildings-repository.service';

const factory = (
    blockedTileRepository: InMemoryBlockedTileRepositoryService,
    buildingCreatedEventFactoryService: BuildingCreatedEventFactoryService,
    buildingsRepositoryService: InMemoryBuildingsRepositoryService,
    spawningBuildingsRepositoryService: InMemorySpawningBuildingsRepositoryService
    ) => {
    return new BuildingsManagerService(
        blockedTileRepository,
        buildingCreatedEventFactoryService,
        buildingsRepositoryService,
        spawningBuildingsRepositoryService
        );
};

export const provider = {
    provide: BuildingsManagerService,
    useFactory: factory,
    deps: [
        InMemoryBlockedTileRepositoryService,
        BuildingCreatedEventFactoryService,
        InMemoryBuildingsRepositoryService,
        InMemorySpawningBuildingsRepositoryService
    ]
};