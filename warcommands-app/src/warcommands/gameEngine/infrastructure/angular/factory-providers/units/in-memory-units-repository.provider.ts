import { InMemoryUnitsRepositoryService } from '../../../memory-repository/unit/in-memory-units-repository-service';

const factory = () => {
    return new InMemoryUnitsRepositoryService();
};

export const provider = {
    provide: InMemoryUnitsRepositoryService,
    useFactory: factory,
    deps: []
};
