import {inject} from "inversify";
import {MessageBrokerService} from "../Domain/Service/MessageBroker.service.ts";
import {MessageBroker} from "../../Shared/MessageBroker/Domain/Service/messageBroker.ts";

export class SharedMessageBrokerService implements MessageBrokerService {

    constructor(@inject(MessageBroker) private readonly messageBroker: MessageBroker) {
    }

    publish(topic: string, data: any): void {
        this.messageBroker.publish(topic, data);
    }

    subscribe(topic: string, cb: FunctionStringCallback): void {
        this.messageBroker.subscribe(topic, cb);
    }

    unsubscribe(): void {
    }

}