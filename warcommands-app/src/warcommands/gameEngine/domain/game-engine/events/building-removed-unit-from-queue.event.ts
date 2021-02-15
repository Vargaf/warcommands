import { EventInterface } from '../../game-event-bus/model/event.interface';
import { UnitGenericDTO } from '../../units/model/unit-generic.dto';
import { EventType } from '../../game-event-bus/model/event-type.enum';


export class BuildingRemovedUnitFromQueueEvent implements EventInterface {
    readonly type = EventType.BuildingRemovedUnitFromQueue;

    private _data: UnitGenericDTO = null;

    constructor(unit: UnitGenericDTO) {
        this._data = unit;
    }

    get data(): UnitGenericDTO {
        return this._data;
    }
}