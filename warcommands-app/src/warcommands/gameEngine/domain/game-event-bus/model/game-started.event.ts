import { EventInterface } from './event.interface';
import { EventType } from './event-type.enum';

export class GameStartedEvent implements EventInterface {
    readonly type = EventType.GameStarted;
}