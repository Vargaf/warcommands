import { Injectable } from '@angular/core';
import { GameService } from '../gameEngine/domain/game.service';
import { FileManagerEvents } from '../commands-panel/domain/file/services/file-manager.events';

@Injectable({
    providedIn: 'root'
})
export class GameServiceListenersService {

    constructor(
        private readonly gameEngine: GameService,
        private readonly fileEventsListener: FileManagerEvents
    ) {}

    setListeners(): void {
        this.setFileLoadedListeners();
        this.setFileSavedListeners();
    }

    private setFileLoadedListeners(): void {
        this.fileEventsListener.fileLoadedListener().subscribe((file) => {
            this.gameEngine.addFile(file);
        });
    }

    private setFileSavedListeners(): void {
        this.fileEventsListener.savedFileListener().subscribe((file) => {
            this.gameEngine.addFile(file);
        });
    }

}