import {RendererService} from "../../Domain/Service/Renderer.service.ts";
import * as THREE from "three";

export class THREERenderer implements RendererService {

    private readonly _renderer: THREE.WebGLRenderer;

    constructor() {
        this._renderer = new THREE.WebGLRenderer();
    }

    domElement(): HTMLCanvasElement {
        return this._renderer.domElement;
    }

    render(scene: THREE.Scene, camera: THREE.Camera): void {
        this._renderer.render(scene, camera);
    }

    setAnimationLoop(callback: XRFrameRequestCallback): void {
        this._renderer.setAnimationLoop(callback);
    }

    setSize(windowInnerWidth: number, windowInnerHeight: number): void {
        this._renderer.setSize(windowInnerWidth, windowInnerHeight);
    }

}