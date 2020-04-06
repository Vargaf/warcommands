import { PlayerCommandsManagerService } from 'src/warcommands/gameEngine/domain/player-commands/player-commands-manager.service';
import { CommandRepositoryInMemoryService } from '../../../memory-repository/command/command-repository-in-memory.service';
import { InMemoryCommandContainerRepositoryService } from '../../../memory-repository/command-container/in-memory-command-container-repository.service';
import { FileParserService } from 'src/warcommands/gameEngine/domain/player-commands/file-parser.service';
import { GameLoopManagerService } from 'src/warcommands/gameEngine/domain/game-loop/services/game-loop-manager.service';
import { PlayerManagerService } from 'src/warcommands/gameEngine/domain/player/services/player-manager.service';
import { FileMirrorDuplicationService } from 'src/warcommands/gameEngine/domain/player-commands/file-mirror-duplication.service';

const factory = (
    commandRepositoryService: CommandRepositoryInMemoryService,
    commandContainerRepositoryService: InMemoryCommandContainerRepositoryService,
    filePaserService: FileParserService,
    gameLoopManager: GameLoopManagerService,
    playerManagerService: PlayerManagerService,
    fileMirrorDuplicationService: FileMirrorDuplicationService
    ) => {
    return new PlayerCommandsManagerService(
        commandRepositoryService,
        commandContainerRepositoryService,
        filePaserService,
        gameLoopManager,
        playerManagerService,
        fileMirrorDuplicationService
        );
};

export const provider = {
    provide: PlayerCommandsManagerService,
    useFactory: factory,
    deps: [
        CommandRepositoryInMemoryService,
        InMemoryCommandContainerRepositoryService,
        FileParserService,
        GameLoopManagerService,
        PlayerManagerService,
        FileMirrorDuplicationService
    ]
};