import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { EnergyFarmBuildingManagerService } from "src/warcommands/vr-mode/domain/buildings/service/energy-farm-building-manager.service";
import { AFramePausableContentService } from "../game-engine/aframe-pausable-content.service";


export class AframeEnergyFarmBuildingManagerService implements EnergyFarmBuildingManagerService{

    constructor(
        private readonly pausableContentService: AFramePausableContentService
    ) {
        
    }

	addFarm(building: BuildingDTO): void {
        const energyFarm = this.pausableContentService.getEnergyFarmFromPool();
        
        energyFarm.addEventListener('object3dset', (event: any) => {    
            energyFarm.setAttribute('energy-farm-building-component', { 'building': building });
        });

        energyFarm.setAttribute('position', { x: building.xCoordinate, y: 0, z: building.yCoordinate }); 
        
    }

}