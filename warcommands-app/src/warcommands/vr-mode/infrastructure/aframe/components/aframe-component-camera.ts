import { BuildingTypeEnum } from "src/warcommands/game-middleware/model/building/building-type.enum";
import { SpawnerBuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { BuildingFilterDTO } from "src/warcommands/vr-mode/domain/buildings/model/building-filter.dto";
import { BuildingsRepositoryInterface } from "src/warcommands/vr-mode/domain/buildings/service/buildings-repository.interface";
import { PlayerRepositoryService } from "src/warcommands/vr-mode/domain/players/services/player-repository.service";
import { THREE } from "aframe";
import { AframeSceneService } from "../aframe-scene.service";


export class AFrameComponentCamera {

    private componentName = 'camera-component';

    constructor(
        private readonly playerRepository: PlayerRepositoryService,
        private readonly buildingsRepository: BuildingsRepositoryInterface,
        private readonly aframeSceneService: AframeSceneService,
    ) {

        const scope = this;

        AFRAME.registerComponent(this.componentName, {

            init: function() {

                scope.aframeSceneService.isInitialized().then(() => {
                    const camera = <THREE.PerspectiveCamera>this.el.getObject3D('camera');
                
                    const player = scope.playerRepository.findCurrentPlayer();
                    const filter: BuildingFilterDTO = {
                        type: BuildingTypeEnum.Base,
                        playerId: <string>player.id
                    };
                    const playerBase:SpawnerBuildingDTO = <SpawnerBuildingDTO>scope.buildingsRepository.findOneBy(filter);

                    const xCoordinate = playerBase.xCoordinate + playerBase.spawnRelativeCoordinates.xCoordinate;
                    const yCoordinate = playerBase.yCoordinate + playerBase.spawnRelativeCoordinates.yCoordinate;

                    // Set the camera in front of the spawning point
                    camera.parent?.position.set( xCoordinate, 3, yCoordinate + 3 );
                    
                    // Calculate the rotation to be able to point the camera to the spawning point
                    // this data will be used to translate the and rotate the hud components
                    const matrix = new THREE.Matrix4();
                    const from = new THREE.Vector3(xCoordinate, 3, yCoordinate + 3);
                    const to = new THREE.Vector3(xCoordinate, 0, yCoordinate);
                    const up = new THREE.Vector3(0, 1, 0);
                    const transformation = matrix.lookAt(from, to, up);

                    // Obtain the quaternion to be able to rotate and translate the components
                    const quaternion = new THREE.Quaternion();
                    quaternion.setFromRotationMatrix(transformation);

                    // Rotate the camera, is the only component that do not need to be translated
                    camera.setRotationFromMatrix(transformation);

                    // Rotate and translate all the hud components
                    if(camera.parent?.children) {
                        for(let child of camera.parent?.children) {
                            // Avoid the camera component
                            if(child.id !== camera.id) {
                                camera.parent?.children[0].position.applyQuaternion(quaternion);
                                camera.parent?.children[0].setRotationFromQuaternion(quaternion);
                            }
                        }     
                    }
                });
            }
        });
    }
}