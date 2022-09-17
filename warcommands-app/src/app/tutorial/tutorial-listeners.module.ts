import { forwardRef, Inject, NgModule } from "@angular/core";import {
    TutorialEventRegister
} from "../../warcommands/tutorial/infrastructure/event-bus/tutorial-event-register";
import * as TutorialEventRegisterProvider
    from "src/warcommands/tutorial/infrastructure/angular/factory-providers/event-bus/tutorial-event-register.provider";
import { EventRegisterInterface } from "../../warcommands/shared/domain/event-bus/event-register.interface";
import * as TutorialUserFirstTimeArrivedEventHandlerProvider from "src/warcommands/tutorial/infrastructure/angular/factory-providers/event-bus/tutorial-user-first-time-arrived-event-handler.provider";

@NgModule( {
    providers: [
        TutorialEventRegisterProvider.provider,
        TutorialUserFirstTimeArrivedEventHandlerProvider.provider,
        { provide: 'EventRegisterInterface', useExisting: forwardRef( () => TutorialEventRegister ) }
    ]
} )
export class TutorialListenersModule {
    constructor(@Inject( 'EventRegisterInterface' ) private tutorialEventRegister: EventRegisterInterface
    ) {
        this.tutorialEventRegister.register();
    }
}
