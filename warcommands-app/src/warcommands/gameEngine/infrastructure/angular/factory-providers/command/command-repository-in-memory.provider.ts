import { CommandRepositoryInMemoryService } from '../../../memory-repository/command/command-repository-in-memory.service';

const factory = () => {
    return new CommandRepositoryInMemoryService();
};

export const provider = {
    provide: CommandRepositoryInMemoryService,
    useFactory: factory,
    deps: []
};