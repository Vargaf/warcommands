import { EventRegisterInterface } from "../../../shared/domain/event-bus/event-register.interface";
import { EventHandlerInterface } from "../../../shared/domain/event-bus/event-handler.interface";

export class TutorialEventRegister implements EventRegisterInterface {

    private _eventHandler: Array<EventHandlerInterface>;

    constructor(...eventHandler: EventHandlerInterface[]) {
        this._eventHandler = eventHandler;
    }

    register(): void {
        this._eventHandler.forEach((handler: EventHandlerInterface) => {
            handler.register();
        });
    }

}
