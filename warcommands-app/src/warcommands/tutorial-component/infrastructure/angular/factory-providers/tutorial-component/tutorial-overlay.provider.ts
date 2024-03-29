import { TutorialOverlayService } from "src/warcommands/tutorial-component/domain/tutorial-component/services/tutorial-overlay.service";
import { Overlay } from "@angular/cdk/overlay";
import { TutorialComponentToggleServiceInterface } from "src/warcommands/tutorial-component/domain/tutorial-component/services/tutorial-component-toggle-service.interface";

const factory = (
    overlay: Overlay,
    tutorialComponentToggleService: TutorialComponentToggleServiceInterface
) => {
    return new TutorialOverlayService(
        overlay,
        tutorialComponentToggleService
    )
};

export const provider = {
    provide: TutorialOverlayService,
    useFactory: factory,
    deps: [
        Overlay,
        TutorialComponentToggleServiceInterface
    ]
};
