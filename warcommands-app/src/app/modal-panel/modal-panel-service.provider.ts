import {Overlay} from "@angular/cdk/overlay";
import {RendererFactory2} from "@angular/core";
import {ModalPanelService} from "./modal-panel.service";

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
