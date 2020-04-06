import { PlayerCommandsManagerService } from 'src/warcommands/gameEngine/domain/player-commands/player-commands-manager.service';
import { CommandRepositoryInMemoryService } from '../../../memory-repository/command/command-repository-in-memory.service';
import { InMemoryCommandContainerRepositoryService } from '../../../memory-repository/command-container/in-memory-command-container-repository.service';
import { FileParserService } from 'src/warcommands/gameEngine/domain/player-commands/file-parser.service';
import { GameLoopManagerService } from 'src/warcommands/gameEngine/domain/game-loop/services/game-loop-manager.service';

const factory = (
    commandRepositoryService: CommandRepositoryInMemoryService,
    commandContainerRepositoryService: InMemoryCommandContainerRepositoryService,
    filePaserService: FileParserService,
    gameLoopManager: GameLoopManagerService
    ) => {
    return new PlayerCommandsManagerService(
        commandRepositoryService,
        commandContainerRepositoryService,
        filePaserService,
        gameLoopManager
        );
};

export const provider = {
    provide: PlayerCommandsManagerService,
    useFactory: factory,
    deps: [
        CommandRepositoryInMemoryService,
        InMemoryCommandContainerRepositoryService,
        FileParserService,
        GameLoopManagerService
    ]
};