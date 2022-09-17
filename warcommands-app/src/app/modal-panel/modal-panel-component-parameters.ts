import {ComponentType} from "@angular/cdk/overlay";

export interface ModalPanelComponentParameters {
    component: ComponentType<any>,
    isClosingModalEnabled: boolean
}
