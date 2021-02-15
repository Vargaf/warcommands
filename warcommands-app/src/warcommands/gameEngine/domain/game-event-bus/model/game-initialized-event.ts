import { EventInterface } from './event.interface';
import { EventType } from './event-type.enum';

export class GameInitializedEvent implements EventInterface {
    readonly type = EventType.Initialized;
}