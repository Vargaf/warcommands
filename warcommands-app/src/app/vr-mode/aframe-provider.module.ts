import { NgModule } from '@angular/core';
import * as AframeComponentsHubProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/aframe/components/aframe-components-hub.provider';
import * as AframeComponentBaseBuildingProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/aframe/components/aframe-component-base-building.provider';
import * as AframeBaseBuildingManagerProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/aframe/buildings/aframe-base-building-manager.provider';
import * as AframeMatterFarmBuildingManagerProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/aframe/buildings/aframe-matter-farm-building-manager.provider';
import * as AframeEnergyFarmBuildingManagerProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/aframe/buildings/aframe-energy-farm-building-manager.provider';
import * as AframeComponentMatterFarmBuildingProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/aframe/components/aframe-component-matter-farm-building.provider';
import * as AframeComponentEnergyFarmBuildingProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/aframe/components/aframe-component-energy-farm-building.provider';



@NgModule({
    providers: [
        AframeComponentsHubProvider.provider,
        AframeComponentBaseBuildingProvider.provider,
        AframeBaseBuildingManagerProvider.provider,
        AframeMatterFarmBuildingManagerProvider.provider,
        AframeEnergyFarmBuildingManagerProvider.provider,
        AframeComponentMatterFarmBuildingProvider.provider,
        AframeComponentEnergyFarmBuildingProvider.provider,
    ]
})
export class AframeProviderModule { }
