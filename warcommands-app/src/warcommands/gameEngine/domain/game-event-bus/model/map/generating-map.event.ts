import { EventInterface } from '../event.interface';
import { EventType } from '../event-type.enum';

export class GeneratingMapEvent implements EventInterface {
    readonly type = EventType.GeneratingMap;
}