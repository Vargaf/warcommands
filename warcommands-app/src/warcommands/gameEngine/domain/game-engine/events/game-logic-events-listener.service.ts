import { GameLogicService } from '../sevices/game-logic.service';
import { GameEventBusService } from '../../game-event-bus/services/game-event-bus.service';
import { EventType } from '../../game-event-bus/model/event-type.enum';
import { UnitsManagerService } from '../units/services/units-manager.service';
import { UnitTypeENUM } from '../units/model/unit-type.enum';

export class GameLogicEventsListenerService {

    constructor(
        private readonly gameLogicService: GameLogicService,
        private readonly gameEventBusService: GameEventBusService,
        private readonly unitsManagerService: UnitsManagerService
    ) {
        this.onCreateMinionListener();
    }

    private onCreateMinionListener(): void {
        this.gameEventBusService.on(EventType.CreateMinion).subscribe((event) => {
            this.unitsManagerService.createUnit(UnitTypeENUM.Minion, event.data);
        });
    }

}