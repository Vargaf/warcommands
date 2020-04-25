import { EventInterface } from '../../game-event-bus/model/event.interface';
import { EventType } from '../../game-event-bus/model/event-type.enum';
import { UnitTypeENUM } from '../../units/model/unit-type.enum';
import { UnitToCreateOnBuildingDTO } from '../../units/model/unit-to-create-on-building.dto';


export class CreateUnitOnBuildingEvent implements EventInterface {
    readonly type = EventType.CreateUnitOnBuilding;

    private _data: UnitToCreateOnBuildingDTO;

    constructor(buildingId: string, unitType: UnitTypeENUM) {
        this._data = {
            buildingId,
            unitType
        };
    }

    get data(): UnitToCreateOnBuildingDTO {
        return this._data;
    }
}