import { ElementRef, Renderer2, RendererFactory2 } from "@angular/core";
import { Subscription } from "rxjs";
import { TutorialOverlayService } from "./tutorial-overlay.service";
import { TutorialComponentToggleServiceInterface } from "./tutorial-component-toggle-service.interface";
import { first } from "rxjs/operators";

export class TutorialComponentService {

    private renderer: Renderer2;

    private closeSubscription!: Subscription;

    private openSubscription!: Subscription;

    constructor(
        private tutorialOverlayService: TutorialOverlayService,
        private renderFactory: RendererFactory2,
        private tutorialComponentToggleService: TutorialComponentToggleServiceInterface,
    ) {
        this.renderer = this.renderFactory.createRenderer(null, null);

        this.closeSubscription = this.tutorialComponentToggleService.closeListener().subscribe(() => {
            this.closeTutorial();
        });

        this.openSubscription = this.tutorialComponentToggleService.openListener().subscribe(() => {
            this.openTutorial();
        });
    }

    setTutorialPanelRelatedElement(relatedElement: ElementRef<HTMLElement>): void {
        this.tutorialOverlayService.setOverlayRelatedElement(relatedElement);
        this.highlightTutorialPanelRelatedElement(relatedElement);
    }

    private highlightTutorialPanelRelatedElement(relatedElement: ElementRef<HTMLElement>): void {
        this.renderer.addClass(relatedElement.nativeElement, 'tutorial-highlight-element');

        this.tutorialComponentToggleService.closeListener().pipe(first()).subscribe(() => {
            this.renderer.removeClass(relatedElement.nativeElement, 'tutorial-highlight-element');
        });
    }

    private openTutorial(): void {
        this.tutorialOverlayService.showOverlay();
    }

    private closeTutorial(): void {
        this.tutorialOverlayService.closeOverlay();
    }
}
