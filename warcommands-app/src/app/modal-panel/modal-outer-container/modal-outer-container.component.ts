import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ModalDynamicContentDirective} from "../modal-dynamic-content.directive";
import {MODAL_PANEL_TOKEN} from "../modal-panel-token";
import {ModalPanelService} from "../modal-panel.service";
import {ModalPanelComponentParameters} from "../modal-panel-component-parameters";

@Component({
    selector: 'app-modal-outer-container',
    templateUrl: './modal-outer-container.component.html',
    styleUrls: ['./modal-outer-container.component.scss']
})
export class ModalOuterContainerComponent implements OnInit {

    @ViewChild(ModalDynamicContentDirective, {static: true})
    dynamicChild!: ModalDynamicContentDirective;

    isClosingModalEnabled: boolean;

    constructor(
        @Inject(MODAL_PANEL_TOKEN) private dynamicComponentParameters: ModalPanelComponentParameters,
        private modalPanelOverlayService: ModalPanelService
    ) {
        this.isClosingModalEnabled = this.dynamicComponentParameters.isClosingModalEnabled;
    }

    ngOnInit(): void {
        this.loadDynamicComponent();
    }

    private loadDynamicComponent() {
        this.dynamicChild.viewContainerRef.createComponent(this.dynamicComponentParameters.component);
    }

    close(): void {
        this.modalPanelOverlayService.remove();
    }
}
