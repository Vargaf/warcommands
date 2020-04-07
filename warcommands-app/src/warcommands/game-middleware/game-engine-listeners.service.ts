import { Injectable } from '@angular/core';
import { BasicModeGameEngineService } from '../basic-mode/game-engine-basic-mode.service';
import { GameEventBusService } from '../gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { EventType } from '../gameEngine/domain/game-event-bus/model/event-type.enum';
import { MapGeneratedEvent } from '../gameEngine/domain/game-event-bus/model/map/map-generated.event';
import { BaseCreaedEvent } from '../gameEngine/domain/game-event-bus/model/base/base-created.event';
import { BaseEntityInterface } from '../basic-mode/domain/building/base/base-entity-interface';
import { BuildingTypeEnum } from '../basic-mode/domain/building/model/building-type.enum';

@Injectable({
    providedIn: 'root'
})
export class GameEngineListenersService {

    constructor(
        private readonly gameEngine: BasicModeGameEngineService,
        private readonly gameEventBusService: GameEventBusService,
    ) {}

    setListeners(): void {
        this.setMapGeneratingListeners();
        this.setBaseCreatedListeners();
    }

    private setMapGeneratingListeners(): void {
        this.gameEventBusService.on(EventType.MapGenerated).subscribe((event: MapGeneratedEvent) => {
            this.gameEngine.generateMap(event.data);
        });
    }

    private setBaseCreatedListeners(): void {
        this.gameEventBusService.on(EventType.BaseGenerated).subscribe((event: BaseCreaedEvent) => {
            const base: BaseEntityInterface = {
                type: BuildingTypeEnum.Base,
                name: event.data.name,
                queueList: event.data.queueList,
                spawnRelativeCoordinates: event.data.spawnRelativeCoordinates,
                id: event.data.id,
                sizeHeight: event.data.sizeHeight,
                sizeWidth: event.data.sizeWidth,
                xCoordinate: event.data.xCoordinate,
                yCoordinate: event.data.yCoordinate,
                playerId: event.data.playerId
            };
            this.gameEngine.addBase(base);
        });
    }
}