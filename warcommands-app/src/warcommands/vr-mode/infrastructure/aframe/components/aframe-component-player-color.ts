import { PlayerRepositoryService } from "src/warcommands/vr-mode/domain/players/services/player-repository.service";
import { THREE } from 'aframe';
import { AFrameComponentNameListENUM } from "./aframe-component-name-list.enum";


export class AFrameComponentPlayerColor {
    
    private componentName = AFrameComponentNameListENUM.PlayerColor;
    
    constructor(
        private readonly playerRepository: PlayerRepositoryService,
    ) {

        const scope = this;

        AFRAME.registerComponent(this.componentName, {
            
            schema: {
                playerId: { tpye: 'string', default: '' },
            },

            init: function() {
                this.el.addEventListener('object3dset', () => {
                    this.update(null);
                });
            },

            update: function(oldData) {
                const playerId = this.data.playerId;
                
                if(playerId) {
                    let color = '#87CEEB';
                    if(playerId !== scope.playerRepository.findCurrentPlayer().id) {
                        color = '#CD5C5C';
                    }
                    const currentObject3D:THREE.Object3D = this.el.getObject3D('mesh');

                    if(currentObject3D) {
                        scope.paintObject3D(currentObject3D, color);
                    }
                }
            },
            
        });
    }

    private paintObject3D(currentObject3D: THREE.Object3D, color: string) {
        
        const object3D = currentObject3D;

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

        const dinamicColor = new THREE.Color(color);
        const colorVertices = [];
        const originalGeometriVertices = playerColorGeometry.getAttribute('position') as THREE.BufferAttribute;
        const colorVerticesCount = originalGeometriVertices.count;
        for (let colorIndex = 0; colorIndex < colorVerticesCount; colorIndex++) {
            colorVertices.push(dinamicColor.r, dinamicColor.g, dinamicColor.b);
        }

        const colorBufferAttribute = new THREE.Float32BufferAttribute(colorVertices, 3);
        playerColorGeometry.setAttribute('color', colorBufferAttribute);
        playerColorMesh.geometry = playerColorGeometry;
    }

    
}