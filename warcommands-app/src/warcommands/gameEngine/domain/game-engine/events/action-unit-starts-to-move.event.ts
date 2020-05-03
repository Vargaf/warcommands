import { EventInterface } from '../../game-event-bus/model/event.interface';
import { EventType } from '../../game-event-bus/model/event-type.enum';
import { UnitGenericDTO } from '../../units/model/unit-generic.dto';

export class ActionUnitStartsToMoveEvent implements EventInterface {
    readonly type = EventType.ActionUnitStartsToMove;

    private _data: UnitGenericDTO;

    constructor(unit: UnitGenericDTO) {
        this._data = unit;
    }

    get data(): UnitGenericDTO {
        return this._data;
    }
}