import "reflect-metadata";
import { injectable, inject } from 'inversify';
import * as THREE from 'three';
import { GameEngineUIService } from "../../Domain/gameEngineUI.service.ts";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GameMap } from "../../../GameService/Domain/model/gameMap.ts";
import { HexTile } from "../../../GameService/Domain/model/hexTile.ts";
import { ThreeHexTileBuilderService } from "./threeHexTileBuilder.service.ts";
import Stats from 'three/examples/jsm/libs/stats.module'
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";

@injectable()
export class ThreeGameEngineUIService implements GameEngineUIService {

    private scene: THREE.Scene;

    constructor(@inject(ThreeHexTileBuilderService) private readonly threeHexTileBuilderService: ThreeHexTileBuilderService) {
    }

    drawCube(): void {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        const stats = new Stats();
        document.body.appendChild(stats.dom)

        const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
        const controls = new OrbitControls( camera, renderer.domElement );
        camera.position.set( 0, 20, 100 );
        controls.update();

        const scene = new THREE.Scene();

        function animate() {

            // required if controls.enableDamping or controls.autoRotate are set to true
            controls.update();

            renderer.render( scene, camera );
            stats.update();

        }

        renderer.setAnimationLoop( animate );
        animate();

        this.scene = scene;
    }

    drawMap(map: GameMap): void {
        /*
        const hexagon:THREE.Object3D = this.threeHexTileBuilderService.hexagonalGeometry();
        let x: number = 0;
        let y: number = 0;

        for (const tile: HexTile of map.getMap()) {
            x = Math.sqrt(3) * tile.hexCubeCoordinateQ + Math.sqrt(3) / 2 * tile.hexCubeCoordinateR;
            y = 3 / 2 * tile.hexCubeCoordinateR;

            const nextHexagon: THREE.Object3D = hexagon.clone();
            nextHexagon.position.set(x, y, 0);
            this.scene.add(nextHexagon);
        }
        */

        const innerHexagonalGeometry = new THREE.CircleGeometry( 0.95, 6 );

        const mesh = new THREE.InstancedMesh( innerHexagonalGeometry, new THREE.MeshBasicMaterial( { color: 0x00ff00 } ), map.getMap().length );
        let x: number = 0;
        let y: number = 0;
        let index: number = 0;
        const transform = new THREE.Object3D();

        for (const tile: HexTile of map.getMap()) {

            x = Math.sqrt(3) * tile.hexCubeCoordinateQ + Math.sqrt(3) / 2 * tile.hexCubeCoordinateR;
            y = 3 / 2 * tile.hexCubeCoordinateR;

            transform.position.set(x, y, 0);
            transform.rotation.z = 0.523599;
            transform.updateMatrix();
            mesh.setMatrixAt(index, transform.matrix);
            index++;

        }
        mesh.instanceMatrix.needsUpdate = true;
        mesh.computeBoundingSphere();
        this.scene.add(mesh);

        this.test(map);

    }

    test(map: GameMap): void {
        let x: number = 0;
        let y: number = 0;
        const points:Array<THREE.Vector3> = [];

        for (const tile: HexTile of map.getMap()) {
            x = Math.sqrt(3) * tile.hexCubeCoordinateQ + Math.sqrt(3) / 2 * tile.hexCubeCoordinateR;
            y = 3 / 2 * tile.hexCubeCoordinateR;
            const offsetMatrix:THREE.Matrix3 = new THREE.Matrix3();
            offsetMatrix.set(x,y,0,0,0,0,0,0,0);
            points.push(...this.outerHexagonLines(offsetMatrix));
        }

        const geometry = new LineGeometry();
        geometry.setFromPoints(points);
        const material = new LineMaterial( { color: 0xffffff, linewidth: 2, opacity: 0.4, transparent: true } );
        const outerLineGrid = new Line2( geometry, material );
        this.scene.add(outerLineGrid);
    }

    private outerHexagonLines(offsetMatrix: THREE.Matrix3): Array<THREE.Vector3> {
        const points = [];

        for (let segment = 0; segment < 6; segment++) {
            points.push(this.outerLineHexagonPoints(1, segment).applyMatrix3(offsetMatrix));
        }
        points.push(this.outerLineHexagonPoints(1, 0).applyMatrix3(offsetMatrix));

        return points;
    }

    private outerLineHexagonPoints(radius: number, cornerNumber: number): THREE.Vector3 {
        let angle_deg = 60*cornerNumber - 30;
        let angle_radians = angle_deg * Math.PI / 180;
        return new THREE.Vector3(radius * Math.cos(angle_radians), radius * Math.sin(angle_radians), 0);
    }
}