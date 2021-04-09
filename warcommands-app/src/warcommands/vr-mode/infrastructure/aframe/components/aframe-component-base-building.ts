import { BuildingTypeEnum } from "src/warcommands/game-middleware/model/building/building-type.enum";
import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { ModelLoaderInterfaceService } from "src/warcommands/vr-mode/domain/game-engine/model-loader-abstract.service";
import { PlayerRepositoryService } from "src/warcommands/vr-mode/domain/players/services/player-repository.service";
import { THREE } from 'aframe';

export class AFrameComponentBaseBuilding {
    
    private componentName = 'base-building-component';

    constructor(
        private readonly modelLoader: ModelLoaderInterfaceService,
        private readonly playerRepository: PlayerRepositoryService
    ) {

        const scope = this;
        const baseXOffset = 1;
        const baseZOffset = 1;

        const defaultBase: BuildingDTO = {
            id: '',
            type: BuildingTypeEnum.Base,
            sizeWidth: 0,
            sizeHeight: 0,
            playerId: '',
            xCoordinate: 0,
            yCoordinate: 0,
        }

        AFRAME.registerComponent(this.componentName, {
            
            baseId: null,

            schema: {
                building: { defaultBase }
            },

            init: function() {
                scope.modelLoader.loadPreloadedModel('Base').then((data) => {
                    data.translateX(baseXOffset);
                    data.translateZ(baseZOffset);
                    this.el.setObject3D('mesh', data);
                    this.paintBaseObject3D();
                })
            },

            update: function(oldData) {
                this.paintBaseObject3D();
                
                
            },

            paintBaseObject3D: function() {
                const currentObject3D = this.el.getObject3D('mesh');

                if(currentObject3D && this.data.building.id && this.baseId !== this.data.building.id) {
                    const object3D = currentObject3D;
                    this.baseId = this.data.building.baseId;
   
                    let playerColorMesh!: THREE.Mesh;
                    object3D.traverse((node : any) => {
                        if (node.name.indexOf('PlayerColor') !== -1) {
                            playerColorMesh = node;
                        }
                    });

                    if(!playerColorMesh) {
                        throw new Error('The base model does no have the "PlayerColor" geometry to paint');
                    }

                    const playerColorGeometry: THREE.BufferGeometry = playerColorMesh.geometry.clone();

                    if(this.data.building.playerId !== scope.playerRepository.findCurrentPlayer().id) {
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

                        this.el.setObject3D('mesh', object3D);
                    }
                    

                }
            },
        });
    }
}