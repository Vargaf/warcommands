import { BuildingTypeEnum } from "src/warcommands/game-middleware/model/building/building-type.enum";
import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { UnitGenericDTO } from "src/warcommands/game-middleware/model/unit/unit-generic.dto";
import { ModelLoaderInterfaceService } from "src/warcommands/vr-mode/domain/game-engine/model-loader-abstract.service";
import { THREE } from "aframe";
import { GameLogicClockService } from "src/warcommands/vr-mode/domain/game-engine/game-logic-clock.service";
import { AFrameComponentNameListENUM } from "./aframe-component-name-list.enum";
import { BaseBuildingDTO } from "src/warcommands/game-middleware/model/building/base-building.dto";


interface DefaultUnitSpawningDTO {
    unit: UnitGenericDTO | null;
    spawnFinish: number;
    spawnStart: number;
}

export class AFrameComponentBaseBuilding {
    
    private componentName = AFrameComponentNameListENUM.Base;
    private rotation = THREE.MathUtils.degToRad(90);

    constructor(
        private readonly modelLoader: ModelLoaderInterfaceService,
        private readonly gameClockService: GameLogicClockService,
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

        const defaultUnitSpawning: DefaultUnitSpawningDTO = {
            unit: null,
            spawnFinish: 0,
            spawnStart: 0,
        };

        AFRAME.registerComponent(this.componentName, {
            
            buildingId: null,
            isSpawning: false,

            schema: {
                building: { defaultBase },
                unitSpawning: { defaultUnitSpawning }
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

            tick: function() {
                if(this.data.unitSpawning?.unit !== null) {
                    this.spawningTick();
                }
            },

            startSpawning: function() {
                this.isSpawning = true;
                const baseModel:THREE.Object3D = this.el.getObject3D('mesh');

                const geometry = new THREE.SphereGeometry( 0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI );
                const material = new THREE.MeshStandardMaterial( {color: 0xffff00} );
                const sphere = new THREE.Mesh( geometry, material );
                sphere.name = 'spawning_sphere';
                sphere.position.set(-1.5, 1.5, 1.5);

                baseModel.add(sphere);
            },

            spawningTick: function() {
                const time = scope.gameClockService.getElapsedTime();
                const spawningStart = this.data.unitSpawning.spawnStart;
                const spawningFinish = this.data.unitSpawning.spawnFinish;

                if(spawningStart <= time && time < spawningFinish) {
                    const baseModel:THREE.Object3D = this.el.getObject3D('mesh');

                    if(!baseModel) {
                        return;
                    }
                
                    const spawningTime = spawningFinish - spawningStart;
                    const spawningStep = Math.PI / spawningTime / 2;
                    const elapsedSpawningTime = time - spawningStart;
                    const thetaOffset = elapsedSpawningTime * spawningStep;

                    const oldSpehereOutside = <THREE.Object3D>baseModel.getObjectByName('spawning_sphere_outside');
                    const oldSpehereInside = <THREE.Object3D>baseModel.getObjectByName('spawning_sphere_inside');
                    if(oldSpehereOutside) {
                        baseModel.remove(oldSpehereOutside);
                        baseModel.remove(oldSpehereInside);
                    }
                    
                    const geometry = new THREE.SphereGeometry( 0.5, 32, 32, 0, Math.PI * 2, thetaOffset, Math.PI - thetaOffset * 2 );
                    const materialOutside = new THREE.MeshStandardMaterial( {color: 0xffcc00} );
                    const sphereOutside = new THREE.Mesh( geometry, materialOutside );
                    sphereOutside.name = 'spawning_sphere_outside';
                    sphereOutside.position.set(-1.5, 1.5, 1.5);
                    sphereOutside.rotateX(scope.rotation);
                    
                    const materialInside = new THREE.MeshStandardMaterial( {color: 0xff9900, side: THREE.BackSide} );
                    const sphereInside = new THREE.Mesh( geometry, materialInside );
                    sphereInside.name = 'spawning_sphere_inside';
                    sphereInside.position.set(-1.5, 1.5, 1.5);
                    sphereInside.rotateX(scope.rotation);


                    baseModel.add(sphereOutside);
                    baseModel.add(sphereInside);
                } else if(time > spawningFinish) {
                    const baseModel:THREE.Object3D = this.el.getObject3D('mesh');

                    if(!baseModel) {
                        return;
                    }

                    const oldSpehereOutside = <THREE.Object3D>baseModel.getObjectByName('spawning_sphere_outside');
                    const oldSpehereInside = <THREE.Object3D>baseModel.getObjectByName('spawning_sphere_inside');
                    if(oldSpehereOutside) {
                        baseModel.remove(oldSpehereOutside);
                        baseModel.remove(oldSpehereInside);
                    }
                }
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