import {ComponentType, ConnectionPositionPair, Overlay, OverlayConfig, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {ElementRef, Injector, Renderer2, RendererFactory2} from "@angular/core";
import {Subscription} from "rxjs";
import {ModalOuterContainerComponent} from "./modal-outer-container/modal-outer-container.component";
import {MODAL_PANEL_TOKEN} from "./modal-panel-token";
import {ModalPanelOverlayConfiguration} from "./modal-panel-overlay-configuration";
import {ModalPanelComponentParameters} from "./modal-panel-component-parameters";

export class ModalPanelService {

    private overlayRef!: OverlayRef;
    private subscriptions: Subscription = new Subscription();
    private renderer: Renderer2;
    private attachedElement: ElementRef|null = null;

    private readonly panelDefaultConfig: ModalPanelOverlayConfiguration = {
        isClosingModalEnabled: false,
        backdropClass: 'modal-panel-component-without-backdrop',
        panelClass: 'modal-panel-component'
    };

    constructor(
        private overlay: Overlay,
        private rendererFactory: RendererFactory2
    ) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    create(component: ComponentType<any>, overlayConfiguration?: ModalPanelOverlayConfiguration): void {
        this.remove();
        const overlayConfigParams = { ...this.panelDefaultConfig, ...overlayConfiguration };

        // Returns an OverlayConfig
        const overlayConfig = this.getOverlayConfig(overlayConfigParams);

        // Returns an OverlayRef
        this.overlayRef = this.overlay.create(overlayConfig);

        const modalPanelComponentParameters: ModalPanelComponentParameters = {
            component: component,
            isClosingModalEnabled: <boolean>overlayConfigParams.isClosingModalEnabled
        };
        const portalInjector = Injector.create({
            providers: [{ provide: MODAL_PANEL_TOKEN, useValue: modalPanelComponentParameters}]
        });

        // Create ComponentPortal that can be attached to a PortalHost
        const filePreviewPortal = new ComponentPortal(
            ModalOuterContainerComponent,
            null,
            portalInjector
        );

        // Attach ComponentPortal to PortalHost
        this.overlayRef.attach(filePreviewPortal);

        if(overlayConfigParams.isClosingModalEnabled) {
             const subscription = this.overlayRef.backdropClick().subscribe(() => {
                this.remove();
            });

            this.subscriptions.add(subscription);
        }

        const subscription = this.overlayRef.keydownEvents().subscribe((keyBoardEvent: KeyboardEvent) => {
            if(overlayConfigParams.isClosingModalEnabled && this.isEscaping(keyBoardEvent)) {
                this.remove();
            }
            keyBoardEvent.stopPropagation();
            return false;
        });

        this.subscriptions.add(subscription);
    }

    attachToElement(relatedElement: ElementRef): void {
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
                new ConnectionPositionPair(
                    { originX: 'center', originY: 'center' },
                    { overlayX: 'center', overlayY: 'center' },
                ),
            ])
            .withFlexibleDimensions(true)
            .withGrowAfterOpen(true);

        this.overlayRef.updatePositionStrategy(positionStrategy);
        this.highlightTutorialPanelRelatedElement(relatedElement);
    }

    remove(): void {
        this.overlayRef?.dispose();
        this.subscriptions.unsubscribe();
        this.detachElement();
    }

    private highlightTutorialPanelRelatedElement(relatedElement: ElementRef<HTMLElement>): void {
        this.renderer.addClass(relatedElement.nativeElement, 'tutorial-highlight-element');
        this.attachedElement = relatedElement;
    }

    private detachElement(): void {
        if(this.attachedElement) {
            this.renderer.removeClass(this.attachedElement.nativeElement, 'tutorial-highlight-element');
            this.attachedElement = null;
        }
    }

    private getOverlayConfig(config: ModalPanelOverlayConfiguration): OverlayConfig {
        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();

        return new OverlayConfig({
            hasBackdrop: true,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy,
        });
    }

    private isEscaping(keyboardEvent: KeyboardEvent): boolean {
        return keyboardEvent.key === 'Esc' || keyboardEvent.key === 'Escape';
    }
}

const factory = (
    overlay: Overlay,
    rendererFactory: RendererFactory2
) => {
    return new ModalPanelService(
        overlay,
        rendererFactory
    );
};

export const provider = {
    provide: ModalPanelService,
    useFactory: factory,
    deps: [
        Overlay,
        RendererFactory2
    ]
};
