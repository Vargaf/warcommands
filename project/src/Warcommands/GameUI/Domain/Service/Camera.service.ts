import * as THREE from "three";

export abstract class CameraService {

    abstract position(x: number, y: number, z: number): void;
    
    abstract lookAt(x: number, y: number, z: number): void;

    abstract camera(): THREE.PerspectiveCamera;

    abstract aspect(windowInnerWidth: number, windowInnerHeight: number): void;

    abstract updateProjectionMatrix(): void;

}