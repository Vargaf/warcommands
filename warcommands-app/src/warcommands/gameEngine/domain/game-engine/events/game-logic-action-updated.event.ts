import { EventInterface } from '../../game-event-bus/model/event.interface';
import { EventType } from '../../game-event-bus/model/event-type.enum';
import { GameLogicActionDTO } from '../../game-logic-actions/model/game-logic-action.dto';

export class GameLogicActionUpdatedEvent implements EventInterface {
    readonly type = EventType.GameLogicActionUpdated;

    private _data: GameLogicActionDTO;

    constructor(action: GameLogicActionDTO) {
        this._data = action;
    }

    get data(): GameLogicActionDTO {
        return this._data;
    }
}