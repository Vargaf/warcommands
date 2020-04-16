import { BaseBuildingDTO } from '../../../building/base/base-building.dto';
import { GameEventBusService } from '../../../game-event-bus/services/game-event-bus.service';
import { CreateMinionEvent } from '../model/create-minion.event';

export class BaseClassService {

    constructor(
        private readonly gameEventBusService: GameEventBusService,
    ) {}

    createMinion(base: BaseBuildingDTO): void {
        
        const createMinionEvent: CreateMinionEvent = new CreateMinionEvent(base);
        this.gameEventBusService.cast(createMinionEvent);
    }

}