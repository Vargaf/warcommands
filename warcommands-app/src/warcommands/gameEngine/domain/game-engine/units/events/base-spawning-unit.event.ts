import { EventInterface } from '../../../game-event-bus/model/event.interface';
import { EventType } from '../../../game-event-bus/model/event-type.enum';
import { UnitGenericDTO } from '../model/unit-generic.dto';

interface BaseSpawningUnitEventDTO {
    unit: UnitGenericDTO,
    spawnTime: number
}

export class BaseSpawningUnitEvent implements EventInterface {
    
    readonly type = EventType.BaseSpawningUnit;

    private _data: BaseSpawningUnitEventDTO = {
        unit: null,
        spawnTime: 0
    };

    constructor(unit: UnitGenericDTO, spawnTime: number) {
        this._data.unit = unit;
        this._data.spawnTime = spawnTime;
    }

    get data(): BaseSpawningUnitEventDTO {
        return this._data;
    }
}