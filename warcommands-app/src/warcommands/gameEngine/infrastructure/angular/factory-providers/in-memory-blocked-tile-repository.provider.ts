import { InMemoryBlockedTileRepositoryService } from '../../memory-repository/build/in-memory-blocked-tile-repository.service';

const factory = () => {
    return new InMemoryBlockedTileRepositoryService();
};

export const provider = {
    provide: InMemoryBlockedTileRepositoryService,
    useFactory: factory,
    deps: []
};
