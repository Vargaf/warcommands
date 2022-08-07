import {EventInterface} from "./event.interface";
import {EventTokenInterface} from "./event-token-interface";

export interface EventBusInterface {

    cast(event: EventInterface): void;

    on(key: string, fn:(event: EventInterface) => void): EventTokenInterface;

    unregister(token: EventTokenInterface): void;

}
