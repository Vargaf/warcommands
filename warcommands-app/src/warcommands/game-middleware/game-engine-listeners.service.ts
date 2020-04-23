import { Injectable } from '@angular/core';
import { BasicModeGameEngineService } from '../basic-mode/game-engine-basic-mode.service';
import { GameEventBusService } from '../gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { EventType } from '../gameEngine/domain/game-event-bus/model/event-type.enum';
import { MapGeneratedEvent } from '../gameEngine/domain/game-event-bus/model/map/map-generated.event';
import { BaseCreaedEvent } from '../gameEngine/domain/game-event-bus/model/base/base-created.event';
import { BaseEntityInterface } from '../basic-mode/domain/building/base/base-entity-interface';
import { BuildingTypeEnum } from '../basic-mode/domain/building/model/building-type.enum';
import { BaseSpawningUnitEvent } from '../gameEngine/domain/units/events/base-spawning-unit.event';
import { BaseSpawnedUnitEvent } from '../gameEngine/domain/units/events/base-spawned-unit.event';

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
        this.onBaseSpawningUnit();
        this.onBaseUnitSpawned();
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
                playerId: event.data.playerId,
                resources: {
                    matter: event.data.resources.matter,
                    energy: event.data.resources.energy
                },
                unitSpawning: {
                    unit: null,
                    spawnFinish: 0,
                    spawnStart: 0
                }
            };
            this.gameEngine.addBuilding(base);
        });
    }

    private onBaseSpawningUnit(): void {
        this.gameEventBusService.on(EventType.BaseSpawningUnit).subscribe((event: BaseSpawningUnitEvent) => {
            this.gameEngine.spawningUnit(event.data.unit, event.data.spawnFinish, event.data.spawnStart);
        });
    }

    private onBaseUnitSpawned(): void {
        this.gameEventBusService.on(EventType.BaseSpawnedUnit).subscribe((event: BaseSpawnedUnitEvent) => {
            this.gameEngine.unitSpawned(event.data.unit);
        });
    }
}