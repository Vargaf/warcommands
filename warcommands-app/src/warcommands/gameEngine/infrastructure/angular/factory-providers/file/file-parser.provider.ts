import { CommandRepositoryInMemoryService } from '../../../memory-repository/command/command-repository-in-memory.service';
import { InMemoryCommandContainerRepositoryService } from '../../../memory-repository/command-container/in-memory-command-container-repository.service';
import { FileParserService } from 'src/warcommands/gameEngine/domain/player-commands/file-parser.service';
import { PlayerManagerService } from 'src/warcommands/gameEngine/domain/player/services/player-manager.service';

const factory = (
    commandRepositoryService: CommandRepositoryInMemoryService,
    commandContainerRepositoryService: InMemoryCommandContainerRepositoryService,
    playerManagerService: PlayerManagerService
    ) => {
    return new FileParserService(commandRepositoryService, commandContainerRepositoryService, playerManagerService);
};

export const provider = {
    provide: FileParserService,
    useFactory: factory,
    deps: [
        CommandRepositoryInMemoryService,
        InMemoryCommandContainerRepositoryService,
        PlayerManagerService
    ]
};