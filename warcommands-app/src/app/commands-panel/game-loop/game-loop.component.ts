import { Component, OnInit } from '@angular/core';
import { FileRepositoryService } from 'src/warcommands/commands/domain/file/services/FileRepository.service';
import { v4 as uuid } from 'uuid';
import { FileDTO } from 'src/warcommands/commands/domain/file/model/file.dto';
import { MouseDragDropHelperService } from 'src/warcommands/commands/domain/command-panel/services/mouse-drag-drop-helper.service';

@Component({
    selector: 'app-game-loop',
    templateUrl: './game-loop.component.html',
    styleUrls: ['./game-loop.component.scss']
})
export class GameLoopComponent implements OnInit {

    gameLoopId: string;
    fileId: string;

    constructor(
        private readonly fileRepository: FileRepositoryService,
        private readonly mouseHelperService: MouseDragDropHelperService
    ) { }

    ngOnInit() {

        this.gameLoopId = uuid();
        this.fileId = uuid();
        this.createInitialFile();
    }

    private createInitialFile(): void {

        const firstFile: FileDTO = {
            id: this.fileId,
            fileNumber: 0,
            name: 'File 1',
            commandContainerId: this.gameLoopId
        };
        this.fileRepository.saveFile(firstFile);
    }

    onMouseMove(event: MouseEvent) {

        this.mouseHelperService.saveActiveCommandContainer(event);

    }
}
