import { CommandRepositoryInMemoryService } from '../../../memory-repository/command/command-repository-in-memory.service';
import { InMemoryCommandContainerRepositoryService } from '../../../memory-repository/command-container/in-memory-command-container-repository.service';
import { FileParserService } from 'src/warcommands/gameEngine/domain/player-commands/file-parser.service';

const factory = (
    commandRepositoryService: CommandRepositoryInMemoryService,
    commandContainerRepositoryService: InMemoryCommandContainerRepositoryService,
    ) => {
    return new FileParserService(commandRepositoryService, commandContainerRepositoryService);
};

export const provider = {
    provide: FileParserService,
    useFactory: factory,
    deps: [
        CommandRepositoryInMemoryService,
        InMemoryCommandContainerRepositoryService
    ]
};