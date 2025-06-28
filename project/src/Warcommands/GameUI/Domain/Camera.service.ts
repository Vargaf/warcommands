import * as THREE from "three";

export abstract class CameraService {

    abstract positionZ(position: number):void;

    abstract camera(): THREE.PerspectiveCamera;

    abstract aspect(windowInnerWidth: number, windowInnerHeight: number): void;

    abstract updateProjectionMatrix(): void;

}