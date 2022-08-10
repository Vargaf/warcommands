import { NgrxTutorialComponentToggleService } from "src/warcommands/tutorial/infrastructure/ngrx/turotial-component/ngrx-tutorial-component-toggle.service";
import { TutorialOverlayService } from "src/warcommands/tutorial/domain/tutorial/services/tutorial-overlay.service";
import { TutorialComponentToggleServiceInterface } from "src/warcommands/tutorial/domain/tutorial/services/tutorial-component-toggle-service.interface";
import { TutorialComponentService } from "src/warcommands/tutorial/domain/tutorial/services/tutorial-component.service";
import { RendererFactory2 } from "@angular/core";

const factory = (
    tutorialOverlayService: TutorialOverlayService,
    renderFactory: RendererFactory2,
    tutorialComponentToggleService: TutorialComponentToggleServiceInterface,
) => {
    return new TutorialComponentService(
        tutorialOverlayService,
        renderFactory,
        tutorialComponentToggleService
    )
};

export const provider = {
    provide: TutorialComponentService,
    useFactory: factory,
    deps: [
        TutorialOverlayService,
        RendererFactory2,
        NgrxTutorialComponentToggleService
    ]
};
