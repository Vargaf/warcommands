import {SceneService} from "../Domain/Scene.service.ts";
import * as THREE from "three";

export class THREEScene extends SceneService {

    private readonly _scene: THREE.Scene;

    constructor() {
        super();
        this._scene = new THREE.Scene();
    }

    add(object: any): void {
        this._scene.add(object);
    }

    scene(): THREE.Scene {
        return this._scene;
    }

}