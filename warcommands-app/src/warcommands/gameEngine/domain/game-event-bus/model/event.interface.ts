import { EventType } from './event-type.enum';

export interface EventInterface {
    type: EventType;
    data?: any;
}