import { UnitGenericDTO } from '../../units/model/unit-generic.dto';
import { EventInterface } from '../../game-event-bus/model/event.interface';
import { EventType } from '../../game-event-bus/model/event-type.enum';
import * as _ from 'lodash';

interface BuildingSpawningUnitEventDTO {
    unit: UnitGenericDTO | null,
    spawnFinish: number,
    spawnStart: number,
}

export class BuildingSpawningUnitEvent implements EventInterface {
    
    readonly type = EventType.BuildingSpawningUnit;

    private _data: BuildingSpawningUnitEventDTO = {
        unit: null,
        spawnFinish: 0,
        spawnStart: 0
    };

    constructor(unit: UnitGenericDTO, spawnFinish: number, spawnStart: number) {
        this._data = {
            unit: _.cloneDeep(unit),
            spawnFinish,
            spawnStart
        }
    }

    get data(): BuildingSpawningUnitEventDTO {
        return this._data;
    }
}