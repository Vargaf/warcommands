import { EventInterface } from '../../../game-event-bus/model/event.interface';
import { EventType } from '../../../game-event-bus/model/event-type.enum';
import { BaseBuildingDTO } from '../../../building/base/base-building.dto';

export class CreateMinionEvent implements EventInterface {
    readonly type = EventType.CreateMinion;

    private _data: BaseBuildingDTO;

    constructor(base: BaseBuildingDTO) {
        this._data = base;
    }

    get data(): BaseBuildingDTO {
        return this._data;
    }
}