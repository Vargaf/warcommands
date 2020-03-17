import { EventInterface } from '../event.interface';
import { EventType } from '../event-type.enum';
import { MapInterface } from 'src/warcommands/gameEngine/interfaces/model/map/map.interface';

export class MapGeneratedEvent implements EventInterface {
    readonly type = EventType.MapGenerated;

    private _data: MapInterface;

    constructor(map: MapInterface) {
        this._data = map;
    }

    get data(): MapInterface {
        return this._data;
    }
}