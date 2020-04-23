import { GameEventBusService } from '../../game-event-bus/services/game-event-bus.service';
import { EventType } from '../../game-event-bus/model/event-type.enum';
import { BuildingsManagerService } from '../services/buildings-manager.service';
import { BaseSpawningUnitEvent } from '../../units/events/base-spawning-unit.event';
import { BaseSpawnedUnitEvent } from '../../units/events/base-spawned-unit.event';

export class BuildingsManagerEventListenersService {

    constructor(
        private readonly gameEventBusService: GameEventBusService,
        private readonly buildingsManagerService: BuildingsManagerService
    ) {
        this.onBaseSpawningUnitEvent();
        this.onBaseSpawnedUnitEvent();
        this.onBaseQueueingUnitEvent();
    }

    private onBaseSpawningUnitEvent(): void {
        this.gameEventBusService.on(EventType.BaseSpawningUnit).subscribe((event: BaseSpawningUnitEvent) => {
            this.buildingsManagerService.addSpawningBuildingId(event.data.unit.buildingId);
            console.log("Creando minion: " + event.data.unit.id);
        });
    }

    private onBaseSpawnedUnitEvent(): void {
        this.gameEventBusService.on(EventType.BaseSpawnedUnit).subscribe((event: BaseSpawnedUnitEvent) => {
            console.log("Minion creado: " + event.data.unit.id);
        });
    }

    private onBaseQueueingUnitEvent(): void {
        this.gameEventBusService.on(EventType.BaseQueueingUnit).subscribe((event) => {
            console.log("Minion a la cola");
        });
    }
}