import { EventInterface } from '../event.interface';
import { EventType } from '../event-type.enum';
import { BaseInterface } from 'src/warcommands/gameEngine/interfaces/model/base/base.interface';

export class BaseCreaedEvent implements EventInterface {
    readonly type = EventType.BaseGenerated;

    private _data: BaseInterface;

    constructor(base: BaseInterface) {
        this._data = base;
    }

    get data(): BaseInterface {
        return this._data;
    }
}