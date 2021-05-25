import { BuildingTypeEnum } from "src/warcommands/game-middleware/model/building/building-type.enum";
import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { ModelLoaderInterfaceService } from "src/warcommands/vr-mode/domain/game-engine/model-loader-abstract.service";
import { AFrameComponentNameListENUM } from "./aframe-component-name-list.enum";

export class AFrameComponentEnergyFarmBuilding {
    
    private componentName = AFrameComponentNameListENUM.EnergyFarm;

    constructor(
        private readonly modelLoader: ModelLoaderInterfaceService,
    ) {

        const scope = this;

        const defaultEnergyFarm: BuildingDTO = {
            id: '',
            type: BuildingTypeEnum.EnergyFarm,
            sizeWidth: 0,
            sizeHeight: 0,
            playerId: '',
            xCoordinate: 0,
            yCoordinate: 0,
        }

        AFRAME.registerComponent(this.componentName, {
            
            buildingId: null,

            schema: {
                building: { defaultBase: defaultEnergyFarm }
            },

            init: function() {
                scope.modelLoader.loadPreloadedModel('EnergyFarm').then((data) => {
                    this.el.setObject3D('mesh', data);
                })
            },

            update: function(oldData) {

            },

        });
    }
}