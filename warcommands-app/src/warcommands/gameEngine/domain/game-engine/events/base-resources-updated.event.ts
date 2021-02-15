import { EventInterface } from '../../game-event-bus/model/event.interface';
import { EventType } from '../../game-event-bus/model/event-type.enum';
import { ResourcesDTO } from '../../share/reources.dto';

interface BaseResourceUpdatedDTO {
    baseId: string;
    resources: ResourcesDTO;
}

export class BaseResourcesUpdateEvent implements EventInterface {
    readonly type = EventType.BaseResourcesUpdated;

    private _data: BaseResourceUpdatedDTO;

    constructor(baseId: string, resources: ResourcesDTO) {
        this._data = {
            baseId,
            resources
        };
    }

    get data(): BaseResourceUpdatedDTO {
        return this._data;
    }
}