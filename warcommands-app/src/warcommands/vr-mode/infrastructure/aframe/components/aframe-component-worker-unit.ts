import { UnitActionTypeENUM } from "src/warcommands/game-middleware/model/unit-action/unit-action-type.enum";
import { UnitGenericDTO } from "src/warcommands/game-middleware/model/unit/unit-generic.dto";
import { ModelLoaderInterfaceService } from "src/warcommands/vr-mode/domain/game-engine/model-loader-abstract.service";
import { PlayerRepositoryService } from "src/warcommands/vr-mode/domain/players/services/player-repository.service";
import { AframeComponentPainterByPlayer } from "./aframe-component-painter-by-player";
import * as _ from 'lodash';
import { UnitActionMoveToDTO } from "src/warcommands/game-middleware/model/unit-action/unit-action-move-to.dto";
import { PathCoordinate } from "src/warcommands/game-middleware/model/unit-action/path-coordinate.dto";
import { CoordinatesEntity } from "src/warcommands/game-middleware/model/map/coordinates.entity";
import { THREE } from "aframe";
import { GameLogicClockService } from "src/warcommands/vr-mode/domain/game-engine/game-logic-clock.service";
import { GameLogicActionTypeENUM } from "src/warcommands/game-middleware/model/game-logic-actions/game-logic-action-type.enum";


export class AFrameComponentWorkerUnit {
    
    private componentName = 'worker-unit-component';
    private positionOffset: CoordinatesEntity = {
        xCoordinate : 1.065,
        yCoordinate : 0.41
    }
    
    constructor(
        private readonly modelLoader: ModelLoaderInterfaceService,
        private readonly playerRepository: PlayerRepositoryService,
        private readonly gameClockService: GameLogicClockService,
    ) {

        const scope = this;

        AFRAME.registerComponent(this.componentName, {
            
            workerId: '',
            movePath: [],
            position: {},

            schema: {
                worker: { default: '' },
            },

            init: function() {
                scope.modelLoader.loadPreloadedModel('Worker').then((data) => {
                    this.el.setObject3D('mesh', data);
                    this.initializeObject3D();
                })
            },

            tick: function (time, timeDelta) {

                if(this.data.worker?.action) {
                    const worker: UnitGenericDTO = this.data.worker;
                    if (worker.action?.type === GameLogicActionTypeENUM.MoveTo) {
                        const object3d = this.el.getObject3D('mesh');
                        const movement = scope.moveUnit(worker, object3d.position);
                        object3d.position.set(movement.x, movement.y, movement.z);
                    }
                }
            },

            update: function(oldData) {
                this.initializeObject3D();
            },

            initializeObject3D: function() {
                
                const currentObject3D:THREE.Object3D = this.el.getObject3D('mesh');
                const worker: UnitGenericDTO = this.data.worker;

                if(currentObject3D && worker.id && this.workerId !== worker.id) {
                    currentObject3D.position.setX(worker.xCoordinate + scope.positionOffset.xCoordinate)
                    currentObject3D.position.setZ(worker.yCoordinate + scope.positionOffset.yCoordinate);
                    this.workerId = worker.id;
   
                    if(worker.playerId !== scope.playerRepository.findCurrentPlayer().id) {
                        const newObject3D = AframeComponentPainterByPlayer.paintObject3D(currentObject3D);
                        this.el.setObject3D('mesh', newObject3D);
                    }
                }
            },
        });
    }

    moveUnit(worker: UnitGenericDTO, actualPosition: THREE.Vector3): THREE.Vector3 {
        const path: PathCoordinate[] = (worker.action as UnitActionMoveToDTO).data.path;
        const time = this.gameClockService.getElapsedTime();

        let currentTileIndex = null;
        let nextTileIndex = 0;
        let xCoordinateNew = actualPosition.x;
        let yCoordinateNew = actualPosition.z;
        
        for(let tileIndex in path) {
            if(path[tileIndex].time >= time) {
                nextTileIndex = +tileIndex;
                currentTileIndex = nextTileIndex - 1;
                break;
            }
        }

        if(currentTileIndex !== null && currentTileIndex < path.length - 1) {
            if(path[currentTileIndex].time <= time && time <= path[nextTileIndex].time) {
                const xFrom = path[currentTileIndex].xCoordinate;
                const yFrom = path[currentTileIndex].yCoordinate;
                const xTo = path[nextTileIndex].xCoordinate;
                const yTo = path[nextTileIndex].yCoordinate;

                const xDirection = xTo - xFrom;
                const yDirection = yTo - yFrom;
                const timeDelta = time - path[currentTileIndex].time;

                const positionDelta = timeDelta / worker.attributes.speed;

                xCoordinateNew = xFrom + positionDelta * xDirection + this.positionOffset.xCoordinate;
                yCoordinateNew = yFrom + positionDelta * yDirection + this.positionOffset.yCoordinate;
            }
            
        } else if(path.length){
            const lastTileIndex = path.length - 1;
            const lastTile = path[lastTileIndex];
            if(lastTile.time < time) {
                xCoordinateNew = lastTile.xCoordinate + this.positionOffset.xCoordinate;
                yCoordinateNew = lastTile.yCoordinate + this.positionOffset.yCoordinate;
            }
        }

        return new THREE.Vector3(xCoordinateNew, actualPosition.y, yCoordinateNew);
    }
}