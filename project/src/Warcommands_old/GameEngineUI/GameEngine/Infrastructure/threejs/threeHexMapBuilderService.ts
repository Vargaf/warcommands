import * as THREE from "three";
import { GameMap } from "../../../GameService/Domain/model/gameMap.ts";
import { MathUtils } from 'three';
import { TileType } from "../../../GameService/Domain/model/tileType.enum.ts";


export class ThreeHexMapBuilderService {

    private scene: THREE.Scene | undefined;

    public setScene(scene: THREE.Scene): void {
        this.scene = scene;
    }

    public drawMap(map: GameMap): void {

        this.sceneGuard()

        // Draw a hexagon
        const innerHexagonalGeometry = new THREE.CircleGeometry( 1, 6 );

        // Instance all the hexagons of the map
        const mesh = new THREE.InstancedMesh( innerHexagonalGeometry, new THREE.MeshBasicMaterial(  ), map.getMap().length );

        // To transform the position of the hexagons on the instance
        const transform = new THREE.Object3D();

        // Make the hexagons point to top
        transform.rotation.z = MathUtils.degToRad(30);
        transform.rotation.x = MathUtils.degToRad(270);

        let x: number = 0;
        let y: number = 0;
        let z: number = 0;
        let index: number = 0;

        const waterTiles: number[] = [];
        const rockTiles: number[] = [];

        for (const tile of map.getMap()) {

            // Calculate the position of the hexagon by their cube coordinate
            x = Math.sqrt(3) * tile.getCoordinates().q + Math.sqrt(3) / 2 * tile.getCoordinates().r;
            y = tile.height() * 0.5;
            z = 3 / 2 * tile.getCoordinates().r;

            transform.position.set(x, y, z);
            transform.updateMatrix();
            mesh.setMatrixAt(index, transform.matrix);

            switch (tile.terrain()) {
                case TileType.Water:
                    waterTiles.push(index);
                    break;
                case TileType.Rock:
                    rockTiles.push(index);
                    break;
                default:
                    break;
            }
            mesh.setColorAt(index, new THREE.Color(tile.color()));

            index++;
        }
        mesh.instanceMatrix.needsUpdate = true;
        mesh.computeBoundingSphere();

        // @ts-ignore, is already checked
        this.scene.add(mesh);
        this.drawWaterAndRockWalls(waterTiles, rockTiles);
    }

    private drawWaterAndRockWalls(waterTiles: number[], rockTiles: number[]): void {
        console.log(waterTiles);
        console.log(rockTiles);
    }

    /*private getWaterNeighbours(): void {

    }

    private getRockNeighbours(): void {

    }*/

    private sceneGuard(): void {
        if(this.scene == undefined) {
            throw new Error('The scene is undefined!');
        }
    }
}