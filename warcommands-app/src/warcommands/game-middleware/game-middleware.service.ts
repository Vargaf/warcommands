import { Injectable, ViewContainerRef } from "@angular/core";
import { GameService } from '../gameEngine/domain/game.service';
import { BasicModeGameEngineService } from '../basic-mode/game-engine-basic-mode.service';
import { MapType } from '../gameEngine/domain/maps/model/map-type.enum';
import { GameEventBusService } from '../gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { EventType } from '../gameEngine/domain/game-event-bus/model/event-type.enum';
import { MapGeneratedEvent } from '../gameEngine/domain/game-event-bus/model/map/map-generated.event';
import { GameServiceListenersService } from './game-service-listeners.service';

@Injectable({
    providedIn: 'root'
})
export class GameMiddlewareService {

    constructor(
        private readonly gameService: GameService,
        private readonly gameEngine: BasicModeGameEngineService,
        private readonly gameServiceListeners: GameServiceListenersService
    ) {
        this.gameServiceListeners.setListeners();
    }

    initialize(gameViewContainerRef: ViewContainerRef): void {
        this.gameEngine.setViewContainerRef(gameViewContainerRef);
        this.gameService.initialize(MapType.OnlyGrass);

        this.gameEngine.start();
    }

    

}