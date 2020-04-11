import { InMemoryBlockedTileRepositoryService } from '../../../memory-repository/build/in-memory-blocked-tile-repository.service';
import { BuildingsManagerService } from 'src/warcommands/gameEngine/domain/building/services/buildings-manager.service';
import { BuildingCreatedEventFactoryService } from 'src/warcommands/gameEngine/domain/building/services/building-created-event-factory.service';
import { InMemoryBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-buildings-repository.service';

const factory = (
    blockedTileRepository: InMemoryBlockedTileRepositoryService,
    buildingCreatedEventFactoryService: BuildingCreatedEventFactoryService,
    buildingsRepositoryService: InMemoryBuildingsRepositoryService
    ) => {
    return new BuildingsManagerService(
        blockedTileRepository,
        buildingCreatedEventFactoryService,
        buildingsRepositoryService
        );
};

export const provider = {
    provide: BuildingsManagerService,
    useFactory: factory,
    deps: [
        InMemoryBlockedTileRepositoryService,
        BuildingCreatedEventFactoryService,
        InMemoryBuildingsRepositoryService
    ]
};