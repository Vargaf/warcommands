import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { EnergyFarmBuildingManagerService } from "src/warcommands/vr-mode/domain/buildings/service/energy-farm-building-manager.service";
import { AframeSceneService } from "../aframe-scene.service";


export class AframeEnergyFarmBuildingManagerService implements EnergyFarmBuildingManagerService{

    constructor(
        private readonly aframeSceneService: AframeSceneService,
    ) {
        
    }

	addFarm(building: BuildingDTO): void {
        const aframeScene = this.aframeSceneService.getSceneElement();
        const poolBase = (aframeScene.components['pool__energy_farm_building'] as any).requestEntity();
        
        poolBase.addEventListener('loaded', (event: any) => {    
            poolBase.setAttribute('energy-farm-building-component', { 'building': building });
        });

        poolBase.setAttribute('position', { x: building.xCoordinate, y: 0, z: building.yCoordinate }); 
        
    }

}