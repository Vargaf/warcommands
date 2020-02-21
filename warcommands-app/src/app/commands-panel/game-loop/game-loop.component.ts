import { Component, OnInit } from '@angular/core';
import { PageRepositoryService } from 'src/warcommands/commands/domain/page/services/PageRepository.service';
import { v4 as uuid } from 'uuid';
import { PageDTO } from 'src/warcommands/commands/domain/page/model/page.dto';
import { MouseDragDropHelperService } from 'src/warcommands/commands/domain/command-panel/services/mouse-drag-drop-helper.service';

@Component({
    selector: 'app-game-loop',
    templateUrl: './game-loop.component.html',
    styleUrls: ['./game-loop.component.scss']
})
export class GameLoopComponent implements OnInit {

    gameLoopId: string;
    pageId: string;

    constructor(
        private readonly pageRepository: PageRepositoryService,
        private readonly mouseHelperService: MouseDragDropHelperService
    ) { }

    ngOnInit() {

        this.gameLoopId = uuid();
        this.pageId = uuid();
        this.createInitialPage();
    }

    private createInitialPage(): void {

        const firstPage: PageDTO = {
            id: this.pageId,
            pageNumber: 0,
            name: 'Page 1',
            commandContainerId: this.gameLoopId
        };
        this.pageRepository.savePage(firstPage);
    }

    onMouseMove(event: MouseEvent) {

        this.mouseHelperService.saveActiveCommandContainer(event);

    }
}
