import { NgModule } from '@angular/core';
import * as AframeComponentsHubProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/aframe/components/aframe-components-hub.provider';
import * as AframeComponentBaseBuildingProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/aframe/components/aframe-component-base-building.provider';
import * as AframeBaseBuildingManagerProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/aframe/buildings/aframe-base-building-manager.provider';



@NgModule({
    providers: [
        AframeComponentsHubProvider.provider,
        AframeComponentBaseBuildingProvider.provider,
        AframeBaseBuildingManagerProvider.provider,
    ]
})
export class AframeProviderModule { }
