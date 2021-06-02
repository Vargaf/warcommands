import { THREE } from 'aframe';

import { AFrameComponentNameListENUM } from "./aframe-component-name-list.enum";

export class AFrameComponentSpawningQueue {
    
    private componentName = AFrameComponentNameListENUM.SpawningQueue;
    
    constructor() {

        const scope = this;

        AFRAME.registerComponent(this.componentName, {
            
            maxUnitsInQueue: 10,
            queueObjectModelName: 'queue_group',
            nextFreeIndexInQueue: 0,
            nextIndexToFreeInQueue: 0,

            init: function() {
                this.el.addEventListener('object3dset', () => {
                    this.createQueueObjectsGroup();
                });
            },

            tick: function() {
                
            },

            createQueueObjectsGroup: function() {
                const baseModel:THREE.Object3D = this.el.getObject3D( 'mesh' );
                const queueGroup = new THREE.Group();
                queueGroup.name = this.queueObjectModelName;
                queueGroup.position.set(-1.5, 1.9, 1.5);
                baseModel.add(queueGroup);
            },

            addUnitToQueue: function() {
                this.addUnitToSpawningQueue();

                this.nextFreeIndexInQueue++;
                if(this.nextFreeIndexInQueue === this.maxUnitsInQueue) {
                    this.nextFreeIndexInQueue = 0;
                }
            },

            removeUnitFromQueue: function() {
                this.removeUnitFromSpawningQueue();

                this.nextIndexToFreeInQueue++;
                if(this.nextIndexToFreeInQueue === this.maxUnitsInQueue) {
                    this.nextIndexToFreeInQueue = 0;
                }
            },

            addUnitToSpawningQueue: function() {
                const baseModel:THREE.Object3D = this.el.getObject3D( 'mesh' );
                const queueGroup: THREE.Object3D = <THREE.Object3D>baseModel.getObjectByName(this.queueObjectModelName);
                const unitQueuedIndex = this.nextFreeIndexInQueue;

                const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
                const material = new THREE.MeshStandardMaterial( {color: 0xff9900} );
                
                const quaternion = new THREE.Quaternion();
                const degreeStep = 360 / 10; // Ten positions (the queue length) around a spin
                const unitDegreePosition = degreeStep * unitQueuedIndex;
                const rotation = THREE.MathUtils.degToRad(unitDegreePosition);
                
                quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), rotation );
                const vector = new THREE.Vector3( 0.4, 0, 0 ); // The displacement from de origin to position the geometry: 0.4 units to the right
                vector.applyQuaternion( quaternion );

                const unitRepresentation = new THREE.Mesh( geometry, material );
                unitRepresentation.name = 'queued_unit_' + unitQueuedIndex;
                unitRepresentation.position.set (vector.x, vector.y, vector.z );
                unitRepresentation.lookAt( 0, -0.4, 0 );

                queueGroup.add(unitRepresentation);
            },

            removeUnitFromSpawningQueue: function() {
                const baseModel:THREE.Object3D = this.el.getObject3D( 'mesh' );
                const queueGroup: THREE.Object3D = <THREE.Object3D>baseModel.getObjectByName(this.queueObjectModelName);
                const unitUnqueuedIndex = this.nextIndexToFreeInQueue;

                const unitUnqueued = <THREE.Object3D>baseModel.getObjectByName('queued_unit_' + unitUnqueuedIndex);
                if(unitUnqueued) {
                    queueGroup.remove(unitUnqueued);
                }
            }
        });
    }
}