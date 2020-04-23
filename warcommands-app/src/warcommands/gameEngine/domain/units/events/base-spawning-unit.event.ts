import { EventInterface } from '../../game-event-bus/model/event.interface';
import { EventType } from '../../game-event-bus/model/event-type.enum';
import { UnitGenericDTO } from '../model/unit-generic.dto';

interface BaseSpawningUnitEventDTO {
    unit: UnitGenericDTO,
    spawnFinish: number,
    spawnStart: number,
}

export class BaseSpawningUnitEvent implements EventInterface {
    
    readonly type = EventType.BaseSpawningUnit;

    private _data: BaseSpawningUnitEventDTO = {
        unit: null,
        spawnFinish: 0,
        spawnStart: 0
    };

    constructor(unit: UnitGenericDTO, spawnFinish: number, spawnStart: number) {
        this._data = {
            unit,
            spawnFinish,
            spawnStart
        }
    }

    get data(): BaseSpawningUnitEventDTO {
        return this._data;
    }
}