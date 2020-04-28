import { GameLogicService } from '../sevices/game-logic.service';
import { GameEventBusService } from '../../game-event-bus/services/game-event-bus.service';
import { EventType } from '../../game-event-bus/model/event-type.enum';
import { UnitsToCreateRepositoryService } from '../../units/services/units-to-create-repository.service';
import { CreateUnitOnBuildingEvent } from '../../building/events/create-unit-on-building.event';

export class GameLogicEventsListenerService {

    constructor(
        private readonly gameEventBusService: GameEventBusService,
        private readonly unitsToCreateRepositoryService: UnitsToCreateRepositoryService
    ) {
        this.onCreateWorkerListener();
    }

    private onCreateWorkerListener(): void {
        this.gameEventBusService.on(EventType.CreateUnitOnBuilding).subscribe((event: CreateUnitOnBuildingEvent) => {
            this.unitsToCreateRepositoryService.save(event.data);
        });
    }

}