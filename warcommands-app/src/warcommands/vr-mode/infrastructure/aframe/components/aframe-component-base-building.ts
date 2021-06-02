import { BuildingTypeEnum } from "src/warcommands/game-middleware/model/building/building-type.enum";
import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { ModelLoaderInterfaceService } from "src/warcommands/vr-mode/domain/game-engine/model-loader-abstract.service";
import { AFrameComponentNameListENUM } from "./aframe-component-name-list.enum";


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
            }
        });
    }
}