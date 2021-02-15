import { InMemoryUnitBlockedTileRepositoryService } from '../../../memory-repository/map/in-memory-unit-blocked-tile-repository.service';

const factory = () => {
    return new InMemoryUnitBlockedTileRepositoryService();
};

export const provider = {
    provide: InMemoryUnitBlockedTileRepositoryService,
    useFactory: factory,
    deps: []
};
