import {MessageBrokerService} from "../Service/MessageBroker.service.ts";
import {inject} from "inversify";
import {MessageBroker} from "../../../Shared/MessageBroker/Domain/Service/messageBroker.ts";
import {EventType} from "../Events/EventType.enum.ts";
import {EventInterface} from "../Events/Event.interface.ts";

export class SharedMessageBrokerService implements MessageBrokerService {

    constructor(@inject(MessageBroker) private readonly messageBroker: MessageBroker) {
    }

    publish(event: EventInterface): Promise<void> {
        return this.messageBroker.publish(event);
    }

    subscribe(topic: EventType, cb: FunctionStringCallback): void {
        this.messageBroker.subscribe(topic, cb);
    }

    unsubscribe(): void {
    }

}