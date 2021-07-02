import { ConnectionPositionPair, Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { ElementRef, Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { Subscription } from "rxjs";
import { IntroductionComponent } from "./introduction/introduction.component";
import { TutorialOverlayRefService } from "./tutorial-overlay-ref.service";

// Each property can be overridden by the consumer
interface TutorialOverlayDialogConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
}

const DEFAULT_CONFIG: TutorialOverlayDialogConfig = {
    hasBackdrop: true,
    backdropClass: 'dark-backdrop',
    panelClass: 'tm-file-preview-dialog-panel'
}

@Injectable({
    providedIn: 'root'
})
export class TutorialOverlayService {

    private renderer: Renderer2;

    private afterClosedSubscription!: Subscription;

    constructor(private readonly overlay: Overlay,
        private readonly renderFactory: RendererFactory2) {

        this.renderer = this.renderFactory.createRenderer(null, null);
    }

    open(config: TutorialOverlayDialogConfig = {}, relatedElement?: ElementRef<HTMLElement>): TutorialOverlayRefService {

        let overlayRef!: OverlayRef;

        if (!relatedElement) {
            overlayRef = this.openGlobalPosition(config);
        } else {
            overlayRef = this.openConnectedTo(config, relatedElement);
        }

        const tutorialOverlayRef = new TutorialOverlayRefService(overlayRef);

        // Subscribe to a stream that emits when the overlay is closed
        this.afterClosedSubscription = tutorialOverlayRef.afeterClosedSubscription(() => {
            if (relatedElement) {
                this.renderer.removeClass(relatedElement.nativeElement, 'cdk-test');
            }
        });

        return tutorialOverlayRef;

    }

    private openGlobalPosition(config: TutorialOverlayDialogConfig): OverlayRef {
        // Override default configuration
        const dialogConfig = { ...DEFAULT_CONFIG, ...config };

        const overlayRef = this.createOverlay(dialogConfig);

        // Create ComponentPortal that can be attached to a PortalHost
        const filePreviewPortal = new ComponentPortal(IntroductionComponent);

        // Attach ComponentPortal to PortalHost
        overlayRef.attach(filePreviewPortal);

        return overlayRef;
    }

    private openConnectedTo(config: TutorialOverlayDialogConfig, relatedElement: ElementRef<HTMLElement>): OverlayRef {
        // Override default configuration
        const dialogConfig = { ...DEFAULT_CONFIG, ...config };

        const overlayRef = this.createRelaterOverlay(dialogConfig, relatedElement);

        // Create ComponentPortal that can be attached to a PortalHost
        const filePreviewPortal = new ComponentPortal(IntroductionComponent);

        // Attach ComponentPortal to PortalHost
        overlayRef.attach(filePreviewPortal);

        this.renderer.addClass(relatedElement.nativeElement, 'cdk-test');

        return overlayRef;
    }

    private getOverlayConfig(config: TutorialOverlayDialogConfig): OverlayConfig {
        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();

        const overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });

        return overlayConfig;

    }

    private createOverlay(config: TutorialOverlayDialogConfig) {

        // Returns an OverlayConfig
        const overlayConfig = this.getOverlayConfig(config);

        // Returns an OverlayRef
        return this.overlay.create(overlayConfig);
    }

    private createRelaterOverlay(config: TutorialOverlayDialogConfig, relatedElement: ElementRef): OverlayRef {

        // Returns an OverlayConfig
        const overlayConfig = this.getRelatedOverlayConfig(config, relatedElement);

        // Returns an OverlayRef
        return this.overlay.create(overlayConfig);
    }

    private getRelatedOverlayConfig(config: TutorialOverlayDialogConfig, relatedElement: ElementRef): OverlayConfig {
        const positionStrategy = this.overlay.position()
            .flexibleConnectedTo(relatedElement)
            .withPositions([
                new ConnectionPositionPair(
                    { originX: 'end', originY: 'top' },
                    { overlayX: 'start', overlayY: 'top' },
                ),
                new ConnectionPositionPair(
                    { originX: 'center', originY: 'bottom' },
                    { overlayX: 'center', overlayY: 'top' },
                ),
            ]);

        const overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });

        return overlayConfig;

    }
}