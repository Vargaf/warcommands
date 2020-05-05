import { Injectable } from '@angular/core';
import { BasicModeGameEngineService } from '../basic-mode/game-engine-basic-mode.service';
import { GameEventBusService } from '../gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { EventType } from '../gameEngine/domain/game-event-bus/model/event-type.enum';
import { MapGeneratedEvent } from '../gameEngine/domain/game-event-bus/model/map/map-generated.event';
import { BuildingSpawningUnitEvent } from '../gameEngine/domain/game-engine/events/building-spawning-unit.event';
import { BuildingSpawnedUnitEvent } from '../gameEngine/domain/game-engine/events/building-spawned-unit.event';
import { BuildingQueueingUnitEvent } from '../gameEngine/domain/game-engine/events/building-queueing-unit.event';
import { BuildingRemovedUnitFromQueueEvent } from '../gameEngine/domain/game-engine/events/building-removed-unit-from-queue.event';
import { BuildingCreaedEvent } from '../gameEngine/domain/building/events/building-created.event';
import { BuildingObjectTranslatorFactory } from './building-object-translator.factory';
import { ActionUnitStartsToMoveEvent } from '../gameEngine/domain/game-engine/events/action-unit-starts-to-move.event';

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
        this.onBuildingSpawningUnit();
        this.onBuildingUnitSpawned();
        this.onBuildingQueueingUnitEvent();
        this.onBuildingRemovedUnitFromQueueEvent();
        this.onBuildingCreatedEvent();
        this.onMoveToActionEvent();
    }

    private setMapGeneratingListeners(): void {
        this.gameEventBusService.on(EventType.MapGenerated).subscribe((event: MapGeneratedEvent) => {
            this.gameEngine.generateMap(event.data);
        });
    }

    private onBuildingCreatedEvent(): void {
        this.gameEventBusService.on(EventType.BuildingCreated).subscribe((event: BuildingCreaedEvent) => {
            const translateBuilding = BuildingObjectTranslatorFactory.translateBuildingType(event.data);
            this.gameEngine.addBuilding(translateBuilding);
        });
    }

    private onBuildingSpawningUnit(): void {
        this.gameEventBusService.on(EventType.BuildingSpawningUnit).subscribe((event: BuildingSpawningUnitEvent) => {
            this.gameEngine.spawningUnit(event.data.unit, event.data.spawnFinish, event.data.spawnStart);
        });
    }

    private onBuildingUnitSpawned(): void {
        this.gameEventBusService.on(EventType.BuildingSpawnedUnit).subscribe((event: BuildingSpawnedUnitEvent) => {
            this.gameEngine.unitSpawned(event.data.unit);
        });
    }

    private onBuildingQueueingUnitEvent(): void {
        this.gameEventBusService.on(EventType.BuildingQueueingUnit).subscribe((event: BuildingQueueingUnitEvent) => {
            this.gameEngine.queueingUnit(event.data.unit);
        });
    }

    private onBuildingRemovedUnitFromQueueEvent(): void {
        this.gameEventBusService.on(EventType.BuildingRemovedUnitFromQueue).subscribe((event: BuildingRemovedUnitFromQueueEvent) => {
            this.gameEngine.buildingRemoveUnitFromQueue(event.data);
        });
    }

    private onMoveToActionEvent(): void {
        this.gameEventBusService.on(EventType.ActionUnitStartsToMove).subscribe((event: ActionUnitStartsToMoveEvent) => {
            this.gameEngine.unitMoving(event.data);
        });
    }
}