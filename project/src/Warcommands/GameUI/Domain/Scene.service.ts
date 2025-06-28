import * as THREE from "three";

export abstract class SceneService {

    abstract add(object:any): void;

    abstract scene(): THREE.Scene;

}