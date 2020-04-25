import { BaseBuildingDTO } from '../../../building/base/base-building.dto';
import { GameEventBusService } from '../../../game-event-bus/services/game-event-bus.service';
import { CreateUnitOnBuildingEvent } from '../../../building/events/create-unit-on-building.event';
import { UnitTypeENUM } from '../../../units/model/unit-type.enum';

export class BaseClassService {

    constructor(
        private readonly gameEventBusService: GameEventBusService,
    ) {}

    createMinion(base: BaseBuildingDTO): void {
        const event: CreateUnitOnBuildingEvent = new CreateUnitOnBuildingEvent(base.id, UnitTypeENUM.Minion);
        this.gameEventBusService.cast(event);

    }

}