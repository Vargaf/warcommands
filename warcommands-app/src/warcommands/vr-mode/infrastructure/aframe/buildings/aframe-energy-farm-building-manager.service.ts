import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { EnergyFarmBuildingManagerService } from "src/warcommands/vr-mode/domain/buildings/service/energy-farm-building-manager.service";
import { AFrameComponentNameListENUM } from "../components/aframe-component-name-list.enum";
import { AFramePausableContentService } from "../game-engine/aframe-pausable-content.service";


export class AframeEnergyFarmBuildingManagerService implements EnergyFarmBuildingManagerService{

    constructor(
        private readonly pausableContentService: AFramePausableContentService
    ) {
        
    }

	addFarm(building: BuildingDTO): void {
        const energyFarm = this.pausableContentService.getEnergyFarmFromPool();
        
        energyFarm.addEventListener('object3dset', (event: any) => {    
            energyFarm.setAttribute(AFrameComponentNameListENUM.EnergyFarm, { 'building': building });
            energyFarm.setAttribute(AFrameComponentNameListENUM.PlayerColor, { 'playerId': building.playerId });

        });

        energyFarm.setAttribute('position', { x: building.xCoordinate, y: 0, z: building.yCoordinate }); 
        
    }

}