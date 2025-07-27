import {MapBuilderService} from "../../Domain/Service/MapBuilder.service.ts";
import {HexTileDTO} from "../../Domain/Model/HexTile.dto.ts";
import {HexTile} from "../../Domain/Model/HexTile.ts";
import * as THREE from "three";
import { MathUtils } from 'three';
import {inject} from "inversify";
import {SceneService} from "../../Domain/Service/Scene.service.ts";


export class ThreeMapBuilderService extends MapBuilderService {

    private _map: HexTile[] = [];

    constructor(@inject(SceneService) private readonly scene: SceneService) {
        super();
    }

    drawMap(hexTileDTO: HexTileDTO[]): void {
        this._map = this.initializeMap(hexTileDTO);

        // Draw a hexagon
        const innerHexagonalGeometry = new THREE.CircleGeometry( 1, 6 );

        // Instance all the hexagons of the map
        const mesh = new THREE.InstancedMesh( innerHexagonalGeometry, new THREE.MeshBasicMaterial(  ), this._map.length );

        // To transform the position of the hexagons on the instance
        const transform = new THREE.Object3D();

        // Make the hexagons point to top
        transform.rotation.z = MathUtils.degToRad(30);
        transform.rotation.x = MathUtils.degToRad(270);

        let x: number = 0;
        let y: number = 0;
        let z: number = 0;
        let index: number = 0;

        for (const tile of this._map) {

            // Calculate the position of the hexagon by their cube coordinate
            x = Math.sqrt(3) * tile.coordinates.q + Math.sqrt(3) / 2 * tile.coordinates.r;
            y = tile.height * 0.5;
            z = 3 / 2 * tile.coordinates.r;

            transform.position.set(x, y, z);
            transform.updateMatrix();
            mesh.setMatrixAt(index, transform.matrix);

            mesh.setColorAt(index, new THREE.Color(tile.color));

            index++;
        }
        mesh.instanceMatrix.needsUpdate = true;
        mesh.computeBoundingSphere();

        this.scene.add(mesh);

    }

}