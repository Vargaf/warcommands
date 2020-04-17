import { EventInterface } from '../../../game-event-bus/model/event.interface';
import { EventType } from '../../../game-event-bus/model/event-type.enum';
import { UnitGenericDTO } from '../model/unit-generic.dto';
import { BaseBuildingDTO } from '../../../building/base/base-building.dto';

interface BaseQueueingUnitEventDTO {
    unit: UnitGenericDTO,
    baseId: string
}

export class BaseQueueingUnitEvent implements EventInterface {
    readonly type = EventType.BaseQueueingUnit;

    private _data: BaseQueueingUnitEventDTO = {
        unit: null,
        baseId: null
    };

    constructor(base: BaseBuildingDTO, unit: UnitGenericDTO) {
        this._data.baseId = base.name;
        this._data.unit = unit;
    }

    get data(): BaseQueueingUnitEventDTO {
        return this._data;
    }
}