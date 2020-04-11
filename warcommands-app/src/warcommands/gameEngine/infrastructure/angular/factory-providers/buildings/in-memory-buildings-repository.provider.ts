import { InMemoryBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-buildings-repository.service';

const factory = (
    ) => {
    return new InMemoryBuildingsRepositoryService();
};

export const provider = {
    provide: InMemoryBuildingsRepositoryService,
    useFactory: factory,
    deps: []
};
