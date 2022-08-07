import { EventInterface } from "./event.interface";

export interface EventHandlerInterface {
    handle(event: EventInterface): void;

    register(): void;
}
