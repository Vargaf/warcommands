import {EventHandlerInterface} from "../../../shared/domain/event-bus/event-handler.interface";
import {EventBusInterface} from "../../../shared/domain/event-bus/event-bus-interface";
import {TutorialEventTypes} from "../../domain/tutorial/events/tutorial-event-types.enum";
import {ModalPanelService} from "../../../../app/modal-panel/modal-panel.service";
import {WelcomeComponent} from "../../../../app/tutorial/welcome/welcome.component";
import {ModalPanelOverlayConfiguration} from "../../../../app/modal-panel/modal-panel-overlay-configuration";
import {EventTokenInterface} from "../../../shared/domain/event-bus/event-token-interface";

export class TutorialUserFirstTimeArrivedEventHandler implements EventHandlerInterface {

    private subscriberToken!: EventTokenInterface;

    constructor(
        private eventBus: EventBusInterface,
        private modalPanelOverlayService: ModalPanelService
    ) {
    }

    handle(): void {
        const modalPanelConfig: ModalPanelOverlayConfiguration = {
            isClosingModalEnabled: false,
            backdropClass: 'modal-panel-component-without-backdrop',
        };
        this.modalPanelOverlayService.create(WelcomeComponent, modalPanelConfig);

        this.eventBus.unregister(this.subscriberToken);
    }

    register(): void {
        this.subscriberToken = this.eventBus.on(TutorialEventTypes.TutorialUserFirstTimeArrived, () => {
            this.handle();
        });
    }

}
