import { UnitGenericDTO } from "src/warcommands/game-middleware/model/unit/unit-generic.dto";
import { ModelLoaderInterfaceService } from "src/warcommands/vr-mode/domain/game-engine/model-loader-abstract.service";
import { PlayerRepositoryService } from "src/warcommands/vr-mode/domain/players/services/player-repository.service";
import { AframeComponentPainterByPlayer } from "./aframe-component-painter-by-player";

export class AFrameComponentWorkerUnit {
    
    private componentName = 'worker-unit-component';

    constructor(
        private readonly modelLoader: ModelLoaderInterfaceService,
        private readonly playerRepository: PlayerRepositoryService
    ) {

        const scope = this;

        AFRAME.registerComponent(this.componentName, {
            
            workerId: '',

            schema: {
                worker: { default: '' },
            },

            init: function() {
                console.log('hololo');
                scope.modelLoader.loadPreloadedModel('Worker').then((data) => {
                    this.el.setObject3D('mesh', data);
                    this.paintBuildingObject3D();
                })
            },

            update: function(oldData) {
                this.paintBuildingObject3D();
            },

            paintBuildingObject3D: function() {
                
                const currentObject3D:THREE.Object3D = this.el.getObject3D('mesh');
                const worker: UnitGenericDTO = this.data.worker;

                if(currentObject3D && worker.id && this.workerId !== worker.id) {
                    this.workerId = worker.id;
   
                    if(worker.playerId !== scope.playerRepository.findCurrentPlayer().id) {
                        const newObject3D = AframeComponentPainterByPlayer.paintObject3D(currentObject3D);
                        this.el.setObject3D('mesh', newObject3D);
                    }
                }
            },
        });
    }
}