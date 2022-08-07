import { forwardRef, Inject, NgModule } from "@angular/core";import {
    TutorialEventRegister
} from "../../warcommands/tutorial-component/infrastructure/event-bus/tutorial-event-register";
import * as TutorialEventRegisterProvider
    from "src/warcommands/tutorial-component/infrastructure/angular/factory-providers/event-bus/tutorial-event-register.provider";
import { EventRegisterInterface } from "../../warcommands/shared/domain/event-bus/event-register.interface";
import * as TutorialFirstTimeOpenEventHandlerProvider from "src/warcommands/tutorial-component/infrastructure/angular/factory-providers/event-bus/tutorial-first-time-opened-event-handler.provider";

@NgModule( {
    providers: [
        TutorialEventRegisterProvider.provider,
        TutorialFirstTimeOpenEventHandlerProvider.provider,
        { provide: 'EventRegisterInterface', useExisting: forwardRef( () => TutorialEventRegister ) }
    ]
} )
export class TutorialListenersModule {
    constructor(@Inject( 'EventRegisterInterface' ) private tutorialEventRegister: EventRegisterInterface
    ) {
        this.tutorialEventRegister.register();
    }
}
