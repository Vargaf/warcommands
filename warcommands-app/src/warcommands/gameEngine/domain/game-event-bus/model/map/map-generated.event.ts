import { EventInterface } from '../event.interface';
import { EventType } from '../event-type.enum';
import { MapDTO } from '../../../maps/model/map.dto';

export class MapGeneratedEvent implements EventInterface {
    readonly type = EventType.MapGenerated;

    private _data: MapDTO;

    constructor(map: MapDTO) {
        this._data = map;
    }

    get data(): MapDTO {
        return this._data;
    }
}