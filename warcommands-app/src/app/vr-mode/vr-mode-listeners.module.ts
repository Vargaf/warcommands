import {Inject, NgModule} from "@angular/core";
import {
    TutorialComponentToggleServiceInterface
} from "../../warcommands/tutorial-component/domain/tutorial-component/services/tutorial-component-toggle-service.interface";
import {NgrxProviderAliasModule} from "../tutorial/ngrx-provider-alias.module";
import {EventBusInterface} from "../../warcommands/shared/domain/event-bus/event-bus-interface";
import {
    TutorialEventTypes
} from "../../warcommands/tutorial-component/domain/tutorial-component/events/tutorial-event-types.enum";
import {
    GameTutorialRepository
} from "../../warcommands/tutorial-component/domain/tutorial-component/services/game-tutorial-repository.interface";

@NgModule({
    imports: [
        NgrxProviderAliasModule,
    ]
})
export class VrModeListenersModule {
    constructor(
        @Inject('EventBusInterface') private eventBus: EventBusInterface,
        private tutorialComponentToggleService: TutorialComponentToggleServiceInterface,
        @Inject('GameTutorialRepository') private localStorage: GameTutorialRepository
    ) {
        this.eventBus.on(TutorialEventTypes.TutorialStarted, () => { this.openTutorial() });
    }

    private openTutorial() {
        this.tutorialComponentToggleService.open();
    }
}
