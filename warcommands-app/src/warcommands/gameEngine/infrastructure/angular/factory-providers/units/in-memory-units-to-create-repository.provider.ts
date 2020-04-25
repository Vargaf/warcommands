import { InMemoryUnitsToCreateRepositoryService } from '../../../memory-repository/unit/in-memory-units-to-create-repository.service';

const factory = () => {
    return new InMemoryUnitsToCreateRepositoryService();
};

export const provider = {
    provide: InMemoryUnitsToCreateRepositoryService,
    useFactory: factory,
    deps: []
};
