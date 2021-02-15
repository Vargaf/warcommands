import { InMemoryBuildingBlockedTileRepositoryService } from '../../../memory-repository/map/in-memory-building-blocked-tile-repository.service';

const factory = () => {
    return new InMemoryBuildingBlockedTileRepositoryService();
};

export const provider = {
    provide: InMemoryBuildingBlockedTileRepositoryService,
    useFactory: factory,
    deps: []
};
