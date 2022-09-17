import {InjectionToken} from "@angular/core";
import {ModalPanelComponentParameters} from "./modal-panel-component-parameters";

export const MODAL_PANEL_TOKEN = new InjectionToken<ModalPanelComponentParameters>('Parameters to open the modal panel');
