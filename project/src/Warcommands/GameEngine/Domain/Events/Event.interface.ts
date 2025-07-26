import {EventType} from "./EventType.enum.ts";

export interface EventInterface {
    topic: EventType;
    data? : any;
}