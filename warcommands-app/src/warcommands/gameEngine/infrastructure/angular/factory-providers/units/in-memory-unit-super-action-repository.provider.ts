import { InMemoryUnitSuperActionRepositoryService } from '../../../memory-repository/unit/in-memory-unit-super-action-repository.service';

const factory = () => {
    return new InMemoryUnitSuperActionRepositoryService();
};

export const provider = {
    provide: InMemoryUnitSuperActionRepositoryService,
    useFactory: factory,
    deps: []
};