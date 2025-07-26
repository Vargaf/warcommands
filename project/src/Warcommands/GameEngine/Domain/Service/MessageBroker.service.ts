import {EventType} from "../Events/EventType.enum.ts";
import {EventInterface} from "../Events/Event.interface.ts";

export abstract class MessageBrokerService {
    abstract publish(event: EventInterface): Promise<void>;

    abstract subscribe(topic: EventType, cb: FunctionStringCallback): void;

    abstract unsubscribe(): void;
}