import { FileJsonDTO } from '../file/file-json.dto';
import { CommandRepositoryService } from 'src/warcommands/gameEngine/domain/command/services/command-repository.service';
import { CommandContainerRepository } from '../command-container/services/command-container-repository';
import { FileParserService } from './file-parser.service';
import { GameLoopManagerService } from '../game-loop/services/game-loop-manager.service';

export class PlayerCommandsManagerService {

    constructor(
        private readonly commandRepository: CommandRepositoryService,
        private readonly commandContainerRepository: CommandContainerRepository,
        private readonly fileParserservice: FileParserService,
        private readonly gameLoopManager: GameLoopManagerService
    ) {}

    addFile(file: FileJsonDTO): void {
        this.fileParserservice.parseFile(file);
    }

    runGameLoop(): void {
        this.gameLoopManager.runGameLoop();
    }

}
