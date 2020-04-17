import { EventInterface } from '../../../game-event-bus/model/event.interface';
import { EventType } from '../../../game-event-bus/model/event-type.enum';
import { UnitGenericDTO } from '../model/unit-generic.dto';
import { BaseBuildingDTO } from '../../../building/base/base-building.dto';

export class BaseSpawnedUnitEvent implements EventInterface {
    readonly type = EventType.BaseSpawnedUnit;

    private _data: {
        unit: UnitGenericDTO,
        base: BaseBuildingDTO
    };

    constructor(base: BaseBuildingDTO, unit: UnitGenericDTO) {
        this._data.base = base;
        this._data.unit = unit;
    }

    get data(): { unit: UnitGenericDTO, base: BaseBuildingDTO } {
        return this._data;
    }
}