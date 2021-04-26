import { NgModule } from '@angular/core';
import * as AframeSceneProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/aframe/aframe-scene.provider';
import * as VrModeGameEngineProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/game-engine/game-engine.provider';
import * as AframeMapProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/aframe/aframe-map.provider';
import * as AframeGLTFModelLoaderProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/game-engine/aframe-gltf-model-loader.provider';
import * as BuildingsManagerServiceProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/buildings/buildings-manager-service.provider';
import { AframeProviderModule } from './aframe-provider.module';
import * as UnitsManagerServiceProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/units/units-manager.provider';
import * as GameLogicClockProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/game-engine/game-logic-clock.provider';



@NgModule({
    imports: [
        AframeProviderModule
    ],
    providers: [
        AframeSceneProvider.provider,
        VrModeGameEngineProvider.provider,
        AframeMapProvider.provider,
        AframeGLTFModelLoaderProvider.provider,
        BuildingsManagerServiceProvider.provider,
        UnitsManagerServiceProvider.provider,
        GameLogicClockProvider.provider,
    ],
})
export class VrModeProviderModule {}
