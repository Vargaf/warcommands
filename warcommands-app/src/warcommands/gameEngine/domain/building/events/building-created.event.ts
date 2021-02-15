import { EventInterface } from '../../game-event-bus/model/event.interface';
import { EventType } from '../../game-event-bus/model/event-type.enum';
import { BuildingDTO } from '../model/building.dto';

export class BuildingCreaedEvent implements EventInterface {
    readonly type = EventType.BuildingCreated;

    private _data: BuildingDTO;

    constructor(building: BuildingDTO) {
        this._data = building;
    }

    get data(): BuildingDTO {
        return this._data;
    }
}