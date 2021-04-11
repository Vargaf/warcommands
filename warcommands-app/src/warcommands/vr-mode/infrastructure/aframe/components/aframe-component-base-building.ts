import { BuildingTypeEnum } from "src/warcommands/game-middleware/model/building/building-type.enum";
import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { ModelLoaderInterfaceService } from "src/warcommands/vr-mode/domain/game-engine/model-loader-abstract.service";
import { PlayerRepositoryService } from "src/warcommands/vr-mode/domain/players/services/player-repository.service";
import { AframeComponentPainterByPlayer } from "./aframe-component-painter-by-player";

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
            
            buildingId: null,

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
                const currentObject3D:THREE.Object3D = this.el.getObject3D('mesh');

                if(currentObject3D && this.data.building.id && this.buildingId !== this.data.building.id) {
                    this.buildingId = this.data.building.id;
   
                    if(this.data.building.playerId !== scope.playerRepository.findCurrentPlayer().id) {
                        const newObject3D = AframeComponentPainterByPlayer.paintObject3D(currentObject3D);
                        this.el.setObject3D('mesh', newObject3D);
                    }
                }
            },
        });
    }
}