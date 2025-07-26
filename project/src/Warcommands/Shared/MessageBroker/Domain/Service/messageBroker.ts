import {EventInterface} from "../Model/Event.interface.ts";

export abstract class MessageBroker {

    abstract publish(event: EventInterface): Promise<void>;

    abstract subscribe(topic: string, cb: FunctionStringCallback): void;

    abstract unsubscribe(): void;

}