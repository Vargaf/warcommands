import * as THREE from "three";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { Line2 } from "three/examples/jsm/lines/Line2";

export class ThreeHexTileBuilderService {

    hexagonalGeometry(): THREE.Object3D {
        const innerHexagonalGeometry = new THREE.CircleGeometry( 1, 6 );
        const innerHexagonMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const innerHexagon= new THREE.Mesh( innerHexagonalGeometry, innerHexagonMaterial );
        innerHexagon.rotateZ(0.523599);

        const outerHexagon: Line2 = this.outerHexagonLines();

        const hexagon: THREE.Object3D = new THREE.Object3D();
        hexagon.add(innerHexagon);
        hexagon.add(<THREE.Object3D>outerHexagon);

        return hexagon;
    }

    private outerHexagonLines(): Line2 {
        const material = new LineMaterial( { color: 0xffffff, linewidth: 2, opacity: 0.4, transparent: true } );
        const points = [];

        for (let segment = 0; segment < 6; segment++) {
            points.push(this.outerLineHexagonPoints(1, segment));
        }
        points.push(this.outerLineHexagonPoints(1, 0));

        const geometry = new LineGeometry();
        geometry.setFromPoints(points);
        return new Line2( geometry, material );
    }

    private outerLineHexagonPoints(radius: number, cornerNumber: number): THREE.Vector3 {
        let angle_deg = 60*cornerNumber - 30;
        let angle_radians = angle_deg * Math.PI / 180;
        return new THREE.Vector3(radius * Math.cos(angle_radians), radius * Math.sin(angle_radians), 0);
    }
}