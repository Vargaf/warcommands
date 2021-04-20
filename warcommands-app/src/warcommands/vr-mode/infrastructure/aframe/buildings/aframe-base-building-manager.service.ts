import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { BaseBuildingManagerService } from "src/warcommands/vr-mode/domain/buildings/service/base-building-manager.service";
import { AFramePausableContentService } from "../game-engine/aframe-pausable-content.service";


export class AframeBaseBuildingManagerService implements BaseBuildingManagerService{

    constructor(
        private readonly pausableContentService: AFramePausableContentService
    ) {
        
    }

	addBase(building: BuildingDTO): void {
        const base = this.pausableContentService.getBaseFromPool();
        
        base.addEventListener('object3dset', (event: any) => {    
            base.setAttribute('base-building-component', { 'building': building });
        });

        base.setAttribute('position', { x: building.xCoordinate, y: 0, z: building.yCoordinate }); 
        
    }

}