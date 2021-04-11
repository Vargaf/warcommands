import { THREE } from 'aframe';


export class AframeComponentPainterByPlayer {


    static paintObject3D(currentObject3D: THREE.Object3D) {
        
        const object3D = currentObject3D.clone();

        let playerColorMesh!: THREE.Mesh;
        object3D.traverse((node : any) => {
            if (node.name.indexOf('PlayerColor') !== -1) {
                playerColorMesh = node;
            }
        });

        if(!playerColorMesh) {
            throw new Error('The model does no have the "PlayerColor" geometry to paint');
        }

        const playerColorGeometry: THREE.BufferGeometry = playerColorMesh.geometry.clone();

        
        const dinamicColor = new THREE.Color('#CD5C5C');
        const colorVertices = [];
        const originalGeometriVertices = playerColorGeometry.getAttribute('position') as THREE.BufferAttribute;
        const colorVerticesCount = originalGeometriVertices.count;
        for (let colorIndex = 0; colorIndex < colorVerticesCount; colorIndex++) {
            colorVertices.push(dinamicColor.r, dinamicColor.g, dinamicColor.b);
        }

        const colorBufferAttribute = new THREE.Float32BufferAttribute(colorVertices, 3);
        playerColorGeometry.setAttribute('color', colorBufferAttribute);
        playerColorMesh.geometry = playerColorGeometry;

        return object3D;
    }

}