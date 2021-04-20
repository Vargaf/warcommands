import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { MatterFarmBuildingManagerService } from "src/warcommands/vr-mode/domain/buildings/service/matter-farm-building-manager.service";
import { AFramePausableContentService } from "../game-engine/aframe-pausable-content.service";


export class AframeMatterFarmBuildingManagerService implements MatterFarmBuildingManagerService{

    constructor(
        private readonly pausableContentService: AFramePausableContentService
    ) {
        
    }

	addFarm(building: BuildingDTO): void {
        const matterFarm = this.pausableContentService.getMatterFarmFromPool();
        
        matterFarm.addEventListener('object3dset', (event: any) => {    
            matterFarm.setAttribute('matter-farm-building-component', { 'building': building });
        });

        matterFarm.setAttribute('position', { x: building.xCoordinate, y: 0, z: building.yCoordinate }); 
        
    }

}