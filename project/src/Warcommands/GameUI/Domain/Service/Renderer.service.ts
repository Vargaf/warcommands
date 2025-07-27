import * as THREE from "three";

export abstract class RendererService {

    abstract render(scene: THREE.Scene, camera: THREE.Camera): void;

    abstract domElement(): HTMLCanvasElement;

    abstract setAnimationLoop(callback: XRFrameRequestCallback): void;

    abstract setSize(windowInnerWidth: number, windowInnerHeight: number): void;

}