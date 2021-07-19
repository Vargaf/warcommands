import { ElementRef, Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { Subscription } from "rxjs";
import { TutorialOverlayRefService } from "./tutorial-overlay-ref.service";
import { TutorialOverlayDialogConfig, TutorialOverlayService } from "./tutorial-overlay.service";

@Injectable({
    providedIn: 'root'
})
export class TutorialComponentService {

    private renderer: Renderer2;

    private afterClosedSubscription!: Subscription;

    private tutorialOverlayRef!: TutorialOverlayRefService;


    constructor(
        private tutorialOverlayService: TutorialOverlayService,
        private renderFactory: RendererFactory2
    ) {
        this.renderer = this.renderFactory.createRenderer(null, null);
    }

    open(config: TutorialOverlayDialogConfig, relatedElement?: ElementRef<HTMLElement>): void {
        if (!relatedElement) {
            this.tutorialOverlayRef = this.tutorialOverlayService.openGlobalPosition(config);
        } else {
            this.tutorialOverlayRef = this.tutorialOverlayService.openConnectedTo(config, relatedElement);
            this.renderer.addClass(relatedElement.nativeElement, 'tutorial-highlight-element');

            // Subscribe to a stream that emits when the overlay is closed
            this.afterClosedSubscription = this.tutorialOverlayRef.afeterClosedSubscription(() => {
                this.renderer.removeClass(relatedElement.nativeElement, 'tutorial-highlight-element');
                this.afterClosedSubscription.unsubscribe();
            });
        }
    }

    close(): void {
        this.tutorialOverlayRef.close();
    }

}