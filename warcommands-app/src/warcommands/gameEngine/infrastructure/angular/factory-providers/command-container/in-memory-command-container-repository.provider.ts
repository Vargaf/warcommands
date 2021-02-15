import { InMemoryCommandContainerRepositoryService } from '../../../memory-repository/command-container/in-memory-command-container-repository.service'

const factory = () => {
    return new InMemoryCommandContainerRepositoryService();
};

export const provider = {
    provide: InMemoryCommandContainerRepositoryService,
    useFactory: factory,
    deps: []
};