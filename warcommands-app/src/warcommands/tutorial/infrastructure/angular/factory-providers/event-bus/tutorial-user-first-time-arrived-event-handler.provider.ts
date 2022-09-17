import { TutorialUserFirstTimeArrivedEventHandler } from "../../../event-bus/tutorial-user-first-time-arrived-event-handler";
import { EventBusInterface } from "../../../../../shared/domain/event-bus/event-bus-interface";
import {ModalPanelService} from "../../../../../../app/modal-panel/modal-panel.service";

const factory = (
    eventBus: EventBusInterface,
    modalPanelOverlayService: ModalPanelService
) => {
    return new TutorialUserFirstTimeArrivedEventHandler(
        eventBus,
        modalPanelOverlayService
    );
};

export const provider = {
    provide: TutorialUserFirstTimeArrivedEventHandler,
    useFactory: factory,
    deps: [ 'EventBusInterface' , ModalPanelService]
};
