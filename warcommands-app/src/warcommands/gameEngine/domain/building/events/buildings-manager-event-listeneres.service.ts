import { GameEventBusService } from '../../game-event-bus/services/game-event-bus.service';
import { EventType } from '../../game-event-bus/model/event-type.enum';
import { BuildingsManagerService } from '../services/buildings-manager.service';
import { BaseSpawningUnitEvent } from '../../game-engine/units/events/base-spawning-unit.event';

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
            this.buildingsManagerService.addSpawningBuildingId(event.data.unit.baseId);
            console.log("Creando minion");
        });
    }

    private onBaseSpawnedUnitEvent(): void {
        this.gameEventBusService.on(EventType.BaseSpawnedUnit).subscribe((event) => {
            console.log("Minion creado");
        });
    }

    private onBaseQueueingUnitEvent(): void {
        this.gameEventBusService.on(EventType.BaseQueueingUnit).subscribe((event) => {
            console.log("Minion a la cola");
        });
    }
}