import { UnitGenericDTO } from '../../units/model/unit-generic.dto';
import { EventInterface } from '../../game-event-bus/model/event.interface';
import { EventType } from '../../game-event-bus/model/event-type.enum';
import { BuildingDTO } from '../../building/model/building.dto';
import * as _ from 'lodash';


interface BuildingQueueingUnitEventDTO {
    unit: UnitGenericDTO,
    buildingId: string
}

export class BuildingQueueingUnitEvent implements EventInterface {
    readonly type = EventType.BuildingQueueingUnit;

    private _data: BuildingQueueingUnitEventDTO = {
        unit: null,
        buildingId: null
    };

    constructor(building: BuildingDTO, unit: UnitGenericDTO) {
        this._data.buildingId = building.id;
        this._data.unit = _.cloneDeep(unit);
    }

    get data(): BuildingQueueingUnitEventDTO {
        return this._data;
    }
}