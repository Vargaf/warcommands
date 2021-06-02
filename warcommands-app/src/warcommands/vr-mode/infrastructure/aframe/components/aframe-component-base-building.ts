import { BuildingTypeEnum } from "src/warcommands/game-middleware/model/building/building-type.enum";
import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { ModelLoaderInterfaceService } from "src/warcommands/vr-mode/domain/game-engine/model-loader-abstract.service";
import { THREE } from "aframe";
import { AFrameComponentNameListENUM } from "./aframe-component-name-list.enum";
import { BaseBuildingDTO } from "src/warcommands/game-middleware/model/building/base-building.dto";


export class AFrameComponentBaseBuilding {
    
    private componentName = AFrameComponentNameListENUM.Base;

    constructor(
        private readonly modelLoader: ModelLoaderInterfaceService,
    ) {

        const scope = this;
        const baseXOffset = 2.5;
        const baseZOffset = -0.5;

        const defaultBase: BuildingDTO = {
            id: '',
            type: BuildingTypeEnum.Base,
            sizeWidth: 0,
            sizeHeight: 0,
            playerId: '',
            xCoordinate: 0,
            yCoordinate: 0,
        };

        AFRAME.registerComponent(this.componentName, {
            
            isSpawning: false,

            schema: {
                building: { defaultBase },
            },

            init: function() {
                scope.modelLoader.loadPreloadedModel('Base').then((data) => {
                    data.translateX(baseXOffset);
                    data.translateZ(baseZOffset);
                    this.el.setObject3D('mesh', data);
                })
            },

            update: function(oldData) {
                this.updatesUnitsInQueue(oldData);
            },

            updatesUnitsInQueue: function(oldData: any) {
                
                const currentBuilding = <BaseBuildingDTO>this.data.building;
                
                if(currentBuilding) {
                    const previousBuilding = <BaseBuildingDTO>oldData.building;

                    if(previousBuilding) {

                        const currentQueuedUnits = currentBuilding.queueList.length;
                        const previousQueuedUnits = previousBuilding.queueList.length;

                        if(currentQueuedUnits > previousQueuedUnits) {
                            this.addUnitToSpawningQueue(currentQueuedUnits);
                        } else if(previousQueuedUnits > currentQueuedUnits) {
                            this.removeUnitFromSpawningQueue(previousQueuedUnits);
                        }
                    }
                }
            },

            addUnitToSpawningQueue: function( unitQueuedIndex:number ) {
                const baseModel:THREE.Object3D = this.el.getObject3D( 'mesh' );

                const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
                const material = new THREE.MeshStandardMaterial( {color: 0xff9900} );
                
                const quaternion = new THREE.Quaternion();
                const rotation = THREE.MathUtils.degToRad(36*unitQueuedIndex);
                
                quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), rotation );
                const vector2 = new THREE.Vector3( 0.4, 0, 0 );
                vector2.applyQuaternion( quaternion );


                const box2 = new THREE.Mesh( geometry, material );
                box2.name = 'queued_unit_' + unitQueuedIndex;
                box2.position.set(-1.5 + vector2.x, 1.9 + vector2.y, 1.5 + vector2.z);
                box2.lookAt(-1.5, 1.5, 1.5);

                baseModel.add(box2);
            },

            removeUnitFromSpawningQueue: function( unitUnqueuedIndex:number )
            {
                const baseModel:THREE.Object3D = this.el.getObject3D( 'mesh' );

                const unitUnqueued = <THREE.Object3D>baseModel.getObjectByName('queued_unit_' + unitUnqueuedIndex);
                if(unitUnqueued) {
                    baseModel.remove(unitUnqueued);
                }
            },
        });
    }
}