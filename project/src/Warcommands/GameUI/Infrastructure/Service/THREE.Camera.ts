import {CameraService} from "../../Domain/Service/Camera.service.ts";
import * as THREE from "three";

export class THREECamera extends CameraService {

    private readonly _camera: THREE.PerspectiveCamera;

    constructor() {
        super();
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    }

    aspect(windowInnerWidth: number, windowInnerHeight: number): void {
        this._camera.aspect = windowInnerWidth / windowInnerHeight;
    }

    camera(): THREE.PerspectiveCamera {
        return this._camera;
    }

    position(x: number, y: number, z: number): void {
        this._camera.position.set(x, y, z);
    }

    lookAt(x: number, y: number, z: number) {
        this._camera.lookAt(x, y, z);
    }

    updateProjectionMatrix(): void {
        this._camera.updateProjectionMatrix();
    }

}