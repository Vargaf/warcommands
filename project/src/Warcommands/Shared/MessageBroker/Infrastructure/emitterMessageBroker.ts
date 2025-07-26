import {MessageBroker} from "../Domain/Service/messageBroker.ts";
import Emittery from "emittery";
import {EventInterface} from "../Domain/Model/Event.interface.ts";

export class EmitterMessageBroker extends MessageBroker {

    private readonly emitter: Emittery;

    constructor() {
        super();

        this.emitter = new Emittery();
    }

    publish(event: EventInterface): Promise<void> {
        return this.emitter.emit(event.topic, event.data);
    }

    subscribe(topic: string, cb: FunctionStringCallback): void {
        this.emitter.on(topic, cb);
    }

    unsubscribe(): void {
    }

}