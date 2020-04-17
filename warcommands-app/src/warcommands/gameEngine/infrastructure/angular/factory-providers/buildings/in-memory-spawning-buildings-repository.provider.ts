import { InMemorySpawningBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-spawning-buildings-repository.service';

const factory = () => {
    return new InMemorySpawningBuildingsRepositoryService();
};

export const provider = {
    provide: InMemorySpawningBuildingsRepositoryService,
    useFactory: factory,
    deps: []
};
