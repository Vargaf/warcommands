import { ModelLoaderInterfaceService } from "src/warcommands/vr-mode/domain/game-engine/model-loader-abstract.service";

export class AFrameComponentBaseBuilding {
    
    private componentName = 'base-building-component';

    constructor(
        private readonly modelLoader: ModelLoaderInterfaceService,
    ) {

        const scope = this;
        const baseXOffset = 1;
        const baseZOffset = 1;


        AFRAME.registerComponent(this.componentName, {
            
            schema: {
                buildingId: { type: 'string', default: '' },
                building: { type: 'model', default: {} }
            },

            init: function() {
                scope.modelLoader.loadPreloadedModel('Base').then((data) => {
                    data.translateX(baseXOffset);
                    data.translateZ(baseZOffset);
                    this.el.setObject3D('mesh', data);
                })
            },

            update: function(oldData) {
                console.log(oldData);
                console.log(this.data);
            }
        });
    }
}