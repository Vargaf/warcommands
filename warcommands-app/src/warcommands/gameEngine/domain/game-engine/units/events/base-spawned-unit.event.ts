import { EventInterface } from '../../../game-event-bus/model/event.interface';
import { EventType } from '../../../game-event-bus/model/event-type.enum';
import { UnitGenericDTO } from '../model/unit-generic.dto';
import { BaseBuildingDTO } from '../../../building/base/base-building.dto';

interface BaseSpawnedUnitEventDTO {
    unit: UnitGenericDTO,
    baseId: string
}

export class BaseSpawnedUnitEvent implements EventInterface {
    readonly type = EventType.BaseSpawnedUnit;

    private _data: BaseSpawnedUnitEventDTO = {
        unit: null,
        baseId: null
    };

    constructor(base: BaseBuildingDTO, unit: UnitGenericDTO) {
        this._data.baseId = base.id;
        this._data.unit = unit;
    }

    get data(): BaseSpawnedUnitEventDTO {
        return this._data;
    }
}