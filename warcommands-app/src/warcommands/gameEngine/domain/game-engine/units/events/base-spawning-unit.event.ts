import { EventInterface } from '../../../game-event-bus/model/event.interface';
import { EventType } from '../../../game-event-bus/model/event-type.enum';
import { UnitGenericDTO } from '../model/unit-generic.dto';
import { BaseBuildingDTO } from '../../../building/base/base-building.dto';

interface BaseSpawningUnitEventDTO {
    unit: UnitGenericDTO,
    base: BaseBuildingDTO
}

export class BaseSpawningUnitEvent implements EventInterface {
    
    readonly type = EventType.BaseSpawningUnit;

    private _data: BaseSpawningUnitEventDTO = {
        unit: null,
        base: null
    };

    constructor(base: BaseBuildingDTO, unit: UnitGenericDTO) {
        this._data.base = base;
        this._data.unit = unit;
    }

    get data(): BaseSpawningUnitEventDTO {
        return this._data;
    }
}