import { GameEventBusService } from '../../game-event-bus/services/game-event-bus.service';
import { EventType } from '../../game-event-bus/model/event-type.enum';
import { BuildingsManagerService } from '../services/buildings-manager.service';
import { BuildingSpawningUnitEvent } from '../../game-engine/events/building-spawning-unit.event';

export class BuildingsManagerEventListenersService {

    constructor(
        private readonly gameEventBusService: GameEventBusService,
        private readonly buildingsManagerService: BuildingsManagerService
    ) {
        this.onBuildingSpawningUnitEvent();
    }

    private onBuildingSpawningUnitEvent(): void {
        this.gameEventBusService.on(EventType.BuildingSpawningUnit).subscribe((event) => {
            <BuildingSpawningUnitEvent>event;
            this.buildingsManagerService.addSpawningBuildingId(event.data.unit.baseId);
        });
    }

    
}