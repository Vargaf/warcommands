import { FileJsonDTO } from '../file/file-json.dto';
import { FileParserService } from './file-parser.service';
import { GameLoopManagerService } from '../game-loop/services/game-loop-manager.service';
import { PlayerManagerService } from '../player/services/player-manager.service';
import { PlayerDTO } from '../player/model/player.dto';
import { FileMirrorDuplicationService } from './file-mirror-duplication.service';

export class PlayerCommandsManagerService {

    constructor(
        private readonly fileParserservice: FileParserService,
        private readonly gameLoopManager: GameLoopManagerService,
        private readonly playerManagerService: PlayerManagerService,
        private readonly fileMirrorDuplicationService: FileMirrorDuplicationService
    ) {}

    addFile(file: FileJsonDTO): void {
        this.fileParserservice.parseFile(file);
        this.setMirroringPlayers(file);
    }

    runPlayerCommands(): void {
        const playerList: PlayerDTO[] = this.playerManagerService.getPlayerList();

        for(const player of playerList) {
            this.gameLoopManager.runGameLoop(player.gameLoopCommandId);
        }
    }

    private setMirroringPlayers(file: FileJsonDTO): void {
        const playerList: PlayerDTO[] = this.playerManagerService.getMirroringIAPlayers();
        for (const player of playerList) {
            const newFile = this.fileMirrorDuplicationService.duplicateFile(file, player.id);
            this.fileParserservice.parseFile(newFile);
        }
    }

}
