import { EventHandlerInterface } from "../../../shared/domain/event-bus/event-handler.interface";
import { EventBusInterface } from "../../../shared/domain/event-bus/event-bus-interface";
import {
    TutorialComponentToggleServiceInterface
} from "../../domain/tutorial/services/tutorial-component-toggle-service.interface";
import { TutorialEventTypes } from "../../domain/tutorial/events/tutorial-event-types.enum";

export class TutorialFirstTimeOpenedEventHandler implements EventHandlerInterface {

    constructor(
        private eventBus: EventBusInterface,
        private tutorialComponentToggleService: TutorialComponentToggleServiceInterface,
    ) {
    }

    handle(): void {
        this.tutorialComponentToggleService.open();
    }

    register(): void {
        this.eventBus.on( TutorialEventTypes.TutorialFirstTimeOpened, () => {
            this.handle();
        } );
    }

}
