import { NgModule } from '@angular/core';
import * as AframeSceneProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/aframe/aframe-scene.provider';
import * as VrModeGameEngineProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/game-engine/game-engine.provider';
import * as AframeMapProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/aframe/aframe-map.provider';
import * as AframeGLTFModelLoaderProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/game-engine/aframe-gltf-model-loader.provider';


@NgModule({
    providers: [
        AframeSceneProvider.provider,
        VrModeGameEngineProvider.provider,
        AframeMapProvider.provider,
        AframeGLTFModelLoaderProvider.provider,
    ],
})
export class VrModeProviderModule {}
