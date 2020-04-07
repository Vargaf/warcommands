import { EventInterface } from '../event.interface';
import { EventType } from '../event-type.enum';
import { BaseBuildingDTO } from '../../../building/base/base-building.dto';

export class BaseCreaedEvent implements EventInterface {
    readonly type = EventType.BaseGenerated;

    private _data: BaseBuildingDTO;

    constructor(base: BaseBuildingDTO) {
        this._data = base;
    }

    get data(): BaseBuildingDTO {
        return this._data;
    }
}