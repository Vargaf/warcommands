import { Renderer2, RendererFactory2 } from "@angular/core";
import { SceneObjectLoaderInterface } from "../../domain/game-engine/scene-object-loader.interface";
import { AframeSceneService } from "./aframe-scene.service";
import { THREE } from 'aframe';


export class AframeSceneObjectLoaderService implements SceneObjectLoaderInterface {

    private renderer: Renderer2;
    
    
    constructor(
        private readonly sceneService: AframeSceneService,
        private readonly rendererFactory: RendererFactory2
    ) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }






    /**
     * 
     * HAY QUE MIRARLO POR QUE QUIZAS ESTE SERVICIO DEBE ELIMINARSE 
     * 
     * @param modelId 
     * @param modelName 
     * @param position 
     */


    addObject(modelId: string, modelName: string, position: THREE.Vector3): void {
        var modelToLoadElement = this.renderer.createElement('a-gltf-model');
		modelToLoadElement.setAttribute('id', modelId);
		modelToLoadElement.setAttribute('src', '#' + modelName);
        modelToLoadElement.setAttribute('position', { x: position.x, y: position.y, z: position.z });
		this.sceneService.getSceneElement().appendChild(modelToLoadElement);
    }

}