import { ConnectionPositionPair, Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { ElementRef, Injectable, Type } from "@angular/core";
import { TutorialOverlayRefService } from "./tutorial-overlay-ref.service";

// Each property can be overridden by the consumer
export interface TutorialOverlayDialogConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    component: Type<any> | null;
}

const DEFAULT_CONFIG: TutorialOverlayDialogConfig = {
    hasBackdrop: true,
    backdropClass: 'dark-backdrop',
    panelClass: 'tm-file-preview-dialog-panel',
    component: null
}

@Injectable({
    providedIn: 'root'
})
export class TutorialOverlayService {

    constructor(private readonly overlay: Overlay) {}

    openGlobalPosition(config: TutorialOverlayDialogConfig): TutorialOverlayRefService {
        
        if(config.component === null) {
            throw new Error('Tutorial component needed.');
        }

        // Override default configuration
        const dialogConfig = { ...DEFAULT_CONFIG, ...config };

        const overlayRef = this.createOverlay(dialogConfig);

        // Create ComponentPortal that can be attached to a PortalHost
        const filePreviewPortal = new ComponentPortal(config.component);

        // Attach ComponentPortal to PortalHost
        overlayRef.attach(filePreviewPortal);

        return new TutorialOverlayRefService(overlayRef);;
    }

    openConnectedTo(config: TutorialOverlayDialogConfig, relatedElement: ElementRef<HTMLElement>): TutorialOverlayRefService {
        
        if(config.component === null) {
            throw new Error('Tutorial component needed.');
        }
        
        // Override default configuration
        const dialogConfig = { ...DEFAULT_CONFIG, ...config };

        const overlayRef = this.createRelaterOverlay(dialogConfig, relatedElement);

        // Create ComponentPortal that can be attached to a PortalHost
        const filePreviewPortal = new ComponentPortal(config.component);

        // Attach ComponentPortal to PortalHost
        overlayRef.attach(filePreviewPortal);

        return new TutorialOverlayRefService(overlayRef);;
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