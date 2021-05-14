import { Injectable } from '@angular/core';
import { GameEventBusService } from '../gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { EventType } from '../gameEngine/domain/game-event-bus/model/event-type.enum';
import { MapGeneratedEvent } from '../gameEngine/domain/game-event-bus/model/map/map-generated.event';
import { BuildingSpawningUnitEvent } from '../gameEngine/domain/game-engine/events/building-spawning-unit.event';
import { BuildingSpawnedUnitEvent } from '../gameEngine/domain/game-engine/events/building-spawned-unit.event';
import { BuildingQueueingUnitEvent } from '../gameEngine/domain/game-engine/events/building-queueing-unit.event';
import { BuildingRemovedUnitFromQueueEvent } from '../gameEngine/domain/game-engine/events/building-removed-unit-from-queue.event';
import { BuildingCreaedEvent } from '../gameEngine/domain/building/events/building-created.event';
import { BuildingObjectTranslatorFactory } from './building-object-translator.factory';
import { BaseResourcesUpdateEvent } from '../gameEngine/domain/game-engine/events/base-resources-updated.event';
import { GameEngineInterface } from './game-engine.interface';
import { GameLogicActionUpdatedEvent } from '../gameEngine/domain/game-engine/events/game-logic-action-updated.event';
import { BuildingsNgrxRepositoryService } from './buildings-ngrx-repository.service';

@Injectable({
    providedIn: 'root'
})
export class GameEngineListenersService {

    constructor(
        private readonly gameEngine: GameEngineInterface,
        private readonly gameEventBusService: GameEventBusService,
        private readonly buildingsNgrxRepository: BuildingsNgrxRepositoryService,
    ) {}

    setListeners(): void {
        this.onGameInitializedEvent();
        this.setMapGeneratingListeners();
        this.onBuildingSpawningUnit();
        this.onBuildingUnitSpawned();
        this.onBuildingQueueingUnitEvent();
        this.onBuildingRemovedUnitFromQueueEvent();
        this.onBuildingCreatedEvent();
        this.onResourcesUpdateEvent();
        this.onGameLogicActionUpdate();
    }

    private onGameInitializedEvent(): void {
        this.gameEventBusService.on(EventType.Initialized).subscribe((event) => {
            this.gameEngine.setGameHasBeenInitialized();
        })
    }

    private setMapGeneratingListeners(): void {
        this.gameEventBusService.on(EventType.MapGenerated).subscribe((event) => {
            <MapGeneratedEvent>event;
            this.gameEngine.generateMap(event.data);
        });
    }

    private onBuildingCreatedEvent(): void {
        this.gameEventBusService.on(EventType.BuildingCreated).subscribe((event) => {
            <BuildingCreaedEvent>event;
            const translateBuilding = BuildingObjectTranslatorFactory.translateBuildingType(event.data);
            this.gameEngine.addBuilding(translateBuilding);
            this.buildingsNgrxRepository.save(translateBuilding);
        });
    }

    private onBuildingSpawningUnit(): void {
        this.gameEventBusService.on(EventType.BuildingSpawningUnit).subscribe((event) => {
            <BuildingSpawningUnitEvent>event;
            this.gameEngine.spawningUnit(event.data.unit, event.data.spawnFinish, event.data.spawnStart);
        });
    }

    private onBuildingUnitSpawned(): void {
        this.gameEventBusService.on(EventType.BuildingSpawnedUnit).subscribe((event) => {
            <BuildingSpawnedUnitEvent>event;
            this.gameEngine.unitSpawned(event.data.unit);
        });
    }

    private onBuildingQueueingUnitEvent(): void {
        this.gameEventBusService.on(EventType.BuildingQueueingUnit).subscribe((event) => {
            <BuildingQueueingUnitEvent>event;
            this.gameEngine.queueingUnit(event.data.unit);
            this.buildingsNgrxRepository.addUnitToQueue(event.data.unit);
        });
    }

    private onBuildingRemovedUnitFromQueueEvent(): void {
        this.gameEventBusService.on(EventType.BuildingRemovedUnitFromQueue).subscribe((event) => {
            <BuildingRemovedUnitFromQueueEvent>event;
            this.gameEngine.buildingRemoveUnitFromQueue(event.data);
            this.buildingsNgrxRepository.removeUnitFromQueue(event.data);
        });
    }

    private onResourcesUpdateEvent(): void {
        this.gameEventBusService.on(EventType.BaseResourcesUpdated).subscribe((event) => {
            <BaseResourcesUpdateEvent>event;
            this.gameEngine.updateBaseResources(event.data.baseId, event.data.resources);
            this.buildingsNgrxRepository.updateBaseResources(event.data.baseId, event.data.resources);
        })
    }

    private onGameLogicActionUpdate(): void {
        this.gameEventBusService.on(EventType.GameLogicActionUpdated).subscribe((event) => {
            <GameLogicActionUpdatedEvent>event;
            this.gameEngine.gameLogicActionUpdate(event.data);
        });
    }
}