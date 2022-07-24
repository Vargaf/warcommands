import {EventInterface} from "./event.interface";
import {EventTokenInterface} from "./event-token-interface";

export abstract class EventBusInterface {

    public abstract cast(event: EventInterface): void;

    public abstract on(key: string, fn:(event: EventInterface) => void): EventTokenInterface;

    public abstract unregister(token: EventTokenInterface): void;

}
