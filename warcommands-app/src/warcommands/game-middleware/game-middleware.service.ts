import { Injectable, ViewContainerRef } from '@angular/core';
import { GameService } from '../gameEngine/domain/game.service';
import { BasicModeGameEngineService } from '../basic-mode/game-engine-basic-mode.service';
import { MapType } from '../gameEngine/domain/maps/model/map-type.enum';
import { GameEngineListenersService } from './game-engine-listeners.service';
import { GameServiceListenersService } from './game-service-listeners.service';
import { FileManagerService } from '../commands-panel/domain/file/services/file-manager.service';

@Injectable({
    providedIn: 'root'
})
export class GameMiddlewareService {

    constructor(
        private readonly gameService: GameService,
        private readonly gameEngine: BasicModeGameEngineService,
        private readonly gameEngineListeners: GameEngineListenersService,
        private readonly gameServiceListeners: GameServiceListenersService,
        private readonly fileManagerService: FileManagerService,
    ) {
        this.gameEngineListeners.setListeners();
        this.gameServiceListeners.setListeners();
    }

    initialize(gameViewContainerRef: ViewContainerRef): void {
        this.gameEngine.setViewContainerRef(gameViewContainerRef);
        this.gameService.initialize(MapType.OnlyGrass);

        this.fileManagerService.loadFiles();

        this.gameEngine.start();
    }



}