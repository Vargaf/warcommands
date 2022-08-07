import { TutorialFirstTimeOpenedEventHandler } from "../../../event-bus/tutorial-first-time-opened-event-handler";
import { EventBusInterface } from "../../../../../shared/domain/event-bus/event-bus-interface";
import {
    TutorialComponentToggleServiceInterface
} from "../../../../domain/tutorial-component/services/tutorial-component-toggle-service.interface";

const factory = (
    eventBus: EventBusInterface,
    tutorialComponentToggleService: TutorialComponentToggleServiceInterface
) => {
    return new TutorialFirstTimeOpenedEventHandler(
        eventBus,
        tutorialComponentToggleService
    );
};

export const provider = {
    provide: TutorialFirstTimeOpenedEventHandler,
    useFactory: factory,
    deps: [ 'EventBusInterface', TutorialComponentToggleServiceInterface ]
};
