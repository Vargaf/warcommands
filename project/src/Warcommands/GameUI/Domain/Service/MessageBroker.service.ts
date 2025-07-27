import {EventInterface} from "../../../GameEngine/Domain/Events/Event.interface.ts";

export abstract class MessageBrokerService {

    abstract publish(event: EventInterface): Promise<void>;

    abstract subscribe(topic: string, cb: FunctionStringCallback): void;

    abstract unsubscribe(): void;
}