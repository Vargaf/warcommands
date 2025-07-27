import {inject} from "inversify";
import {MessageBrokerService} from "../../Domain/Service/MessageBroker.service.ts";
import {MessageBroker} from "../../../Shared/MessageBroker/Domain/Service/messageBroker.ts";
import {EventInterface} from "../../../GameEngine/Domain/Events/Event.interface.ts";

export class SharedMessageBrokerService implements MessageBrokerService {

    constructor(@inject(MessageBroker) private readonly messageBroker: MessageBroker) {
    }

    publish(event: EventInterface): Promise<void> {
        return this.messageBroker.publish(event);
    }

    subscribe(topic: string, cb: FunctionStringCallback): void {
        this.messageBroker.subscribe(topic, cb);
    }

    unsubscribe(): void {
    }

}