import { THREE } from 'aframe';

export abstract class SceneObjectLoaderInterface {

    abstract addObject(modelId: string, modelName: string, position: THREE.Vector3): void; 

}