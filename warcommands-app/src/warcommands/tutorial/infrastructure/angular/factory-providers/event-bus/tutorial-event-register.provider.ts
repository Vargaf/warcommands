import { TutorialEventRegister } from "../../../event-bus/tutorial-event-register";
import { EventHandlerInterface } from "../../../../../shared/domain/event-bus/event-handler.interface";
import { TutorialUserFirstTimeArrivedEventHandler } from "../../../event-bus/tutorial-user-first-time-arrived-event-handler";

const factory = (
    tutorialFirstTimeOpenedEventHandler: EventHandlerInterface,
) => {
    return new TutorialEventRegister(
        tutorialFirstTimeOpenedEventHandler,
    );
};

export const provider = {
    provide: TutorialEventRegister,
    useFactory: factory,
    deps: [TutorialUserFirstTimeArrivedEventHandler]
};
