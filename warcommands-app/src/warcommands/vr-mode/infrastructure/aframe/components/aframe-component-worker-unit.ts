import { UnitGenericDTO } from "src/warcommands/game-middleware/model/unit/unit-generic.dto";
import { ModelLoaderInterfaceService } from "src/warcommands/vr-mode/domain/game-engine/model-loader-abstract.service";
import { CoordinatesEntity } from "src/warcommands/game-middleware/model/map/coordinates.entity";
import { GameLogicClockService } from "src/warcommands/vr-mode/domain/game-engine/game-logic-clock.service";
import { GameLogicActionTypeENUM } from "src/warcommands/game-middleware/model/game-logic-actions/game-logic-action-type.enum";
import { GameLogicActionMoveToDTO } from "src/warcommands/game-middleware/model/game-logic-actions/game-logic-action-move-to.dto";
import { PathFindingCoordinate } from "src/warcommands/game-middleware/model/map/path-finding-coordinate.dto";
import { GameLogicActionUnitHarvestDTO } from "src/warcommands/game-middleware/model/game-logic-actions/game-logic-action-unit-harvest.dto";
import { GameLogicActionUnitDeliverDTO } from "src/warcommands/game-middleware/model/game-logic-actions/game-logic-action-unit-deliver.dto";
import { AFrameComponentNameListENUM } from "./aframe-component-name-list.enum";
import { THREE } from 'aframe';
import { BuildingsRepositoryInterface } from "src/warcommands/vr-mode/domain/buildings/service/buildings-repository.interface";



export class AFrameComponentWorkerUnit {
    
    private componentName = AFrameComponentNameListENUM.Worker;
    
    private baseDirection: THREE.Vector3 = new THREE.Vector3( 1, 0, 0 );

    private nextDirectionVector: THREE.Vector3 = new THREE.Vector3( 0, 0, 0 );

    constructor(
        private readonly modelLoader: ModelLoaderInterfaceService,
        private readonly gameClockService: GameLogicClockService,
        private readonly buildingsRepository: BuildingsRepositoryInterface,
    ) {

        const scope = this;
        
        AFRAME.registerComponent(this.componentName, {

            nextTileCoordinates: {
                xCoordinate : 0,
                yCoordinate : 0
            },
        
            currentUnitDirection: {
                xCoordinate: 0,
                yCoordinate: 1
            },
            
            schema: {
                worker: { default: '' },
                isJustSpawned: { type: 'boolean', default: false }
            },

            init: function() {
                scope.modelLoader.loadPreloadedModel('Worker').then((data) => {
                    this.el.setObject3D('mesh', data);
                    this.initializeObject3D();
                });
            },

            tick: function (time, timeDelta) {

                if(this.data.worker?.action) {
                    const worker: UnitGenericDTO = this.data.worker;
                    const object3d = this.el.getObject3D('mesh');
                    switch(worker.action.type) {
                        case GameLogicActionTypeENUM.MoveTo:
                            this.moveUnit(worker, object3d);
                            break;
                        case GameLogicActionTypeENUM.Harvest:
                            this.setWorkerOnFarmingPlace(worker, object3d);
                            break;
                        case GameLogicActionTypeENUM.Deliver:
                            this.setWorkerOnDeliverPlace(worker, object3d);
                            break;
                        case GameLogicActionTypeENUM.Void:
                            break;
                        default:
                            throw new Error('Unrecognized action: ' + worker.action.type);
                    }
                }
            },

            update: function(oldData) {
                this.initializeObject3D();
            },

            initializeObject3D: function() {
                
                if(this.data.isJustSpawned) {
                    const currentObject3D:THREE.Object3D = this.el.getObject3D('mesh');
                    const worker: UnitGenericDTO = this.data.worker;

                    if(currentObject3D && worker.id) {
                        currentObject3D.position.x = worker.xCoordinate;
                        currentObject3D.position.z = worker.yCoordinate;
                    }

                    this.el.setAttribute(scope.componentName, { isJustSpawned: false });
                }
            },

            moveUnit(worker: UnitGenericDTO, object3d: THREE.Object3D) {
                const actualPosition = object3d.position;
                const path: PathFindingCoordinate[] = (worker.action as GameLogicActionMoveToDTO).data.path;
                const time = scope.gameClockService.getElapsedTime();
        
                let currentTileIndex = 0;
                let nextTileIndex = 0;
                let xCoordinateNew = actualPosition.x;
                let yCoordinateNew = actualPosition.z;
                let unitHasMoved = false;
                
                // Get the current and next tiles to move the unit
                for(let tileIndex in path) {
                    if(path[tileIndex].time >= time) {
                        nextTileIndex = +tileIndex;
                        currentTileIndex = nextTileIndex - 1;
                        break;
                    }
                }
        
                // Check if the unit has not arrived to the end position yet
                if(currentTileIndex !== null && currentTileIndex < path.length - 1) {
                    if(path[currentTileIndex] && path[currentTileIndex].time <= time && time <= path[nextTileIndex].time) {
                        const xFrom = path[currentTileIndex].xCoordinate;
                        const yFrom = path[currentTileIndex].yCoordinate;
                        const xTo = path[nextTileIndex].xCoordinate;
                        const yTo = path[nextTileIndex].yCoordinate;
        
                        const xDirection = xTo - xFrom;
                        const yDirection = yTo - yFrom;
                        const timeDelta = time - path[currentTileIndex].time;
        
                        const positionDelta = timeDelta / worker.attributes.speed;
        
                        xCoordinateNew = xFrom + positionDelta * xDirection;
                        yCoordinateNew = yFrom + positionDelta * yDirection;
        
                        unitHasMoved = true;
                    }
                    
                } else if(path.length){
        
                    const lastTileIndex = path.length - 1;
                    const lastTile = path[lastTileIndex];
                    if(lastTile.time < time) {
                        // If the unit has already arrived to the destination we set it at the exact position
                        xCoordinateNew = lastTile.xCoordinate;
                        yCoordinateNew = lastTile.yCoordinate;
                    }
                }
        
                object3d.position.x = xCoordinateNew;
                object3d.position.z = yCoordinateNew;
        
                if(unitHasMoved) {
                    // If the unit has moved we have to recalculate its rotation angle if needed
                    const from: CoordinatesEntity = {
                        xCoordinate: path[currentTileIndex].xCoordinate,
                        yCoordinate: path[currentTileIndex].yCoordinate
                    };
        
                    const to: CoordinatesEntity = {
                        xCoordinate: path[nextTileIndex].xCoordinate,
                        yCoordinate: path[nextTileIndex].yCoordinate
                    }

                    this.setUnitRotationAngle(from, to, object3d);
                }
        
            },
        
            setWorkerOnFarmingPlace(worker: UnitGenericDTO, object3d: THREE.Object3D): void {
                const currentX = object3d.position.x;
                const currentY = object3d.position.z;
        
                const action = <GameLogicActionUnitHarvestDTO>worker.action;
                const endX = action.data.coordinates.xCoordinate;
                const endY = action.data.coordinates.yCoordinate;
                if(currentX !== endX || currentY !== endY) {
                    object3d.position.x = endX;
                    object3d.position.z = endY;
        
                    const farm = scope.buildingsRepository.findOneById(action.data.buildingId);
        
                    const from: CoordinatesEntity = {
                        xCoordinate: endX,
                        yCoordinate: endY
                    };
        
                    const to: CoordinatesEntity = {
                        xCoordinate: farm.xCoordinate,
                        yCoordinate: farm.yCoordinate
                    }
                    this.setUnitRotationAngle(from, to, object3d);
                }
            },
        
            setWorkerOnDeliverPlace(worker: UnitGenericDTO, object3d: THREE.Object3D): void {
                const currentX = object3d.position.x;
                const currentY = object3d.position.z;
        
                const action = <GameLogicActionUnitDeliverDTO>worker.action;
                const endX = action.data.coordinates.xCoordinate;
                const endY = action.data.coordinates.yCoordinate;
                if(currentX !== endX || currentY !== endY) {
                    object3d.position.x = endX;
                    object3d.position.z = endY;
                }
            },
        
            setUnitRotationAngle( from: CoordinatesEntity, to: CoordinatesEntity, object3d: THREE.Object3D ): void {
                const xTo = to.xCoordinate;
                const yTo = to.yCoordinate;
                const xFrom = from.xCoordinate;
                const yFrom = from.yCoordinate;
        
                const xDirection = xTo - xFrom;
                const yDirection = yTo - yFrom;
        
                if(xTo !== this.nextTileCoordinates.xCoordinate || yTo !== this.nextTileCoordinates.yCoordinate) {
                    if( xDirection !== this.currentUnitDirection.xCoordinate || yDirection !== this.currentUnitDirection.yCoordinate ) {
                        
                        const nextDirectionVector = scope.nextDirectionVector.set(xDirection, yDirection, 0);
        
                        let angle = nextDirectionVector.angleTo(scope.baseDirection);
                        
                        if( yDirection > 0 ) {
                            angle *= -1;
                        }
                        object3d.rotation.y = angle;
                        
                        this.currentUnitDirection = {
                            xCoordinate: xDirection,
                            yCoordinate: yDirection
                        };
        
                        this.nextTileCoordinates = {
                            xCoordinate: xTo,
                            yCoordinate: yTo
                        }
                    }
                }
            }
        });
    }
}