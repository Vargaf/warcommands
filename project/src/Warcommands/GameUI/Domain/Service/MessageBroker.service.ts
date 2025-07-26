
export abstract class MessageBrokerService {
    abstract publish(topic: string, data: any): void;

    abstract subscribe(topic: string, cb: FunctionStringCallback): void;

    abstract unsubscribe(): void;
}