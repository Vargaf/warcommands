import { ConnectionPositionPair, Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { ElementRef, Type } from "@angular/core";
import { TutorialComponentToggleServiceInterface } from "./tutorial-component-toggle-service.interface";
import { TutorialComponent } from "src/app/tutorial/tutorial/tutorial.component";

export interface TutorialOverlayDialogConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    component: Type<any> | null;
}

const DEFAULT_CONFIG: TutorialOverlayDialogConfig = {
    hasBackdrop: true,
    backdropClass: 'tutorial-component-backdrop',
    panelClass: 'tutorial-component-panel',
    component: null
}

export class TutorialOverlayService {

    private overlayRef!: OverlayRef;

    constructor(
        private readonly overlay: Overlay,
        private tutorialComponentToggleService: TutorialComponentToggleServiceInterface,
    ) {}

    showOverlay(): void
    {
        // Returns an OverlayConfig
        const overlayConfig = this.getOverlayConfig(DEFAULT_CONFIG);

        // Returns an OverlayRef
        this.overlayRef = this.overlay.create(overlayConfig);

        // Create ComponentPortal that can be attached to a PortalHost
        const filePreviewPortal = new ComponentPortal(TutorialComponent);

        // Attach ComponentPortal to PortalHost
        this.overlayRef.attach(filePreviewPortal);

        this.overlayRef.backdropClick().subscribe(() => {
            this.tutorialComponentToggleService.close();
        });
    }

    closeOverlay(): void {
        this.overlayRef.dispose();
    }

    setOverlayRelatedElement(relatedElement: ElementRef): void {
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

        this.overlayRef.updatePositionStrategy(positionStrategy);
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
}
