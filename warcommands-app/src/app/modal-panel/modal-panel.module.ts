import {NgModule} from '@angular/core';
import {ModalOuterContainerComponent} from './modal-outer-container/modal-outer-container.component';
import { ModalDynamicContentDirective } from './modal-dynamic-content.directive';
import {MaterialModule} from "../share/material/material.module";
import {CommonModule} from "@angular/common";
import * as ModalPanelOverlayServiceProvider from "./modal-panel.service";

@NgModule({
    declarations: [
        ModalOuterContainerComponent,
        ModalDynamicContentDirective
    ],
    imports: [
        MaterialModule,
        CommonModule,
    ],
    providers: [
        ModalPanelOverlayServiceProvider.provider,
    ]
})
export class ModalPanelModule {
}
