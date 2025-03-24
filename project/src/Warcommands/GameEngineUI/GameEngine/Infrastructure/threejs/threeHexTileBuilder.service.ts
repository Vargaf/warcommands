import * as THREE from "three";

export class ThreeHexTileBuilderService {

    public outerHexagonLines(): Array<THREE.Vector3> {
        const points = [];
        const initialPoint: THREE.Vector3 = this.outerLineHexagonPoints(1, 0);

        points.push(new THREE.Vector3(initialPoint.x, initialPoint.y, -1));
        for (let segment = 0; segment < 6; segment++) {
            points.push(this.outerLineHexagonPoints(1, segment));
        }
        points.push(initialPoint);
        points.push(new THREE.Vector3(initialPoint.x, initialPoint.y, -1));

        return points;
    }

    private outerLineHexagonPoints(radius: number, cornerNumber: number): THREE.Vector3 {
        let angle_deg = 60*cornerNumber - 30;
        let angle_radians = angle_deg * Math.PI / 180;
        return new THREE.Vector3(radius * Math.cos(angle_radians), radius * Math.sin(angle_radians), 0.01);
    }
}