import { GameEventBusService } from '../../game-event-bus/services/game-event-bus.service';
import { EventType } from '../../game-event-bus/model/event-type.enum';
import { BuildingsManagerService } from '../services/buildings-manager.service';
import { BuildingSpawningUnitEvent } from '../../game-engine/events/building-spawning-unit.event';
import { BuildingSpawnedUnitEvent } from '../../game-engine/events/building-spawned-unit.event';

export class BuildingsManagerEventListenersService {

    constructor(
        private readonly gameEventBusService: GameEventBusService,
        private readonly buildingsManagerService: BuildingsManagerService
    ) {
        this.onBuildingSpawningUnitEvent();
        this.onBuildinSpawnedUnitEvent();
        this.onBuildingQueueingUnitEvent();
    }

    private onBuildingSpawningUnitEvent(): void {
        this.gameEventBusService.on(EventType.BuildingSpawningUnit).subscribe((event: BuildingSpawningUnitEvent) => {
            this.buildingsManagerService.addSpawningBuildingId(event.data.unit.baseId);
            console.log("Creando minion: " + event.data.unit.id);
        });
    }

    private onBuildinSpawnedUnitEvent(): void {
        this.gameEventBusService.on(EventType.BuildingSpawnedUnit).subscribe((event: BuildingSpawnedUnitEvent) => {
            console.log("Minion creado: " + event.data.unit.id);
        });
    }

    private onBuildingQueueingUnitEvent(): void {
        this.gameEventBusService.on(EventType.BuildingQueueingUnit).subscribe((event) => {
            console.log("Minion a la cola");
        });
    }
}