import { THREE } from 'aframe';
import { GameLogicClockService } from "src/warcommands/vr-mode/domain/game-engine/game-logic-clock.service";

import { AFrameComponentNameListENUM } from "./aframe-component-name-list.enum";

export class AFrameComponentSpawningUnit {
    
    private componentName = AFrameComponentNameListENUM.SpawningUnit;
    private rotation = THREE.MathUtils.degToRad(90);
    
    constructor(
        private readonly gameClockService: GameLogicClockService,
    ) {

        const scope = this;

        AFRAME.registerComponent(this.componentName, {
            
            isSpawning: false,
            spawnStart: 0,
            spawnFinish: 0,

            init: function() {
                
            },

            spawnUnit: function(spawnStart: number, spawnFinish: number) {
                this.isSpawning = true;
                this.spawnStart = spawnStart;
                this.spawnFinish = spawnFinish;
            },

            unitSpawned: function() {
                this.isSpawning = false;
                this.removeSpawningSpehere();
            },

            tick: function() {
                if(this.isSpawning) {
                    const time = scope.gameClockService.getElapsedTime();
                    const spawningStart = this.spawnStart;
                    const spawningFinish = this.spawnFinish;

                    if(spawningStart <= time && time < spawningFinish) {
                        const baseModel:THREE.Object3D = this.el.getObject3D('mesh');

                        if(!baseModel) {
                            return;
                        }

                        this.removeSpawningSpehere();

                        const spinDregrees = this.getSpinRotationDegrees(time);
                        const thetaOffset = this.getTthetaOffset(time);
                        const geometry = new THREE.SphereGeometry( 0.5, 32, 32, 0, Math.PI * 2, thetaOffset, Math.PI - thetaOffset * 2 );

                        const sphereOutside = <THREE.Mesh>this.buildSpawningSphere(geometry, 0xffcc00, THREE.FrontSide);
                        sphereOutside.name = 'spawning_sphere_outside';
                        sphereOutside.rotateZ(spinDregrees);
                        
                        const sphereInside = <THREE.Mesh>this.buildSpawningSphere(geometry, 0xff9900, THREE.BackSide);
                        sphereInside.name = 'spawning_sphere_inside';
                        sphereInside.rotateZ(spinDregrees);
                        
                        baseModel.add(sphereOutside);
                        baseModel.add(sphereInside);
                    }
                }
            },

            removeSpawningSpehere: function() {
                const baseModel:THREE.Object3D = this.el.getObject3D('mesh');

                const oldSpehereOutside = <THREE.Object3D>baseModel.getObjectByName('spawning_sphere_outside');
                const oldSpehereInside = <THREE.Object3D>baseModel.getObjectByName('spawning_sphere_inside');
                
                if(oldSpehereOutside) {
                    baseModel.remove(oldSpehereOutside);
                    baseModel.remove(oldSpehereInside);
                }
            },

            getTthetaOffset: function(time: number) {
                const spawningTime = this.spawnFinish - this.spawnStart;
                const spawningStep = Math.PI / spawningTime / 2;
                const elapsedSpawningTime = time - this.spawnStart;
                return elapsedSpawningTime * spawningStep;
            },

            getSpinRotationDegrees: function(time: number) {
                const rotationSpeed = 360 / 10000; // One spin each 10 seconds
                return THREE.MathUtils.degToRad(time * rotationSpeed);
            },

            buildSpawningSphere: function(geometry: THREE.SphereGeometry, color: number, side: number) {
                const materialOutside = new THREE.MeshStandardMaterial( {color, side} );
                const sphere = new THREE.Mesh( geometry, materialOutside );
                sphere.position.set(-1.5, 1.5, 1.5);
                sphere.rotateX(scope.rotation);

                return sphere;
            }
            
        });
    }
}