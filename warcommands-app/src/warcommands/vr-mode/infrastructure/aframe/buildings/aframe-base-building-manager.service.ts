import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { BaseBuildingManagerService } from "src/warcommands/vr-mode/domain/buildings/service/base-building-manager.service";
import { AframeSceneService } from "../aframe-scene.service";


export class AframeBaseBuildingManagerService implements BaseBuildingManagerService{

    constructor(
        private readonly aframeSceneService: AframeSceneService,
    ) {
        
    }

	addBase(building: BuildingDTO): void {
        const aframeScene = this.aframeSceneService.getSceneElement();
        const poolBase = (aframeScene.components['pool__base_building'] as any).requestEntity();
        
        poolBase.addEventListener('loaded', (event: any) => {    
            poolBase.setAttribute('base-building-component', { 'building': building });
        });

        poolBase.setAttribute('position', { x: building.xCoordinate, y: 0, z: building.yCoordinate }); 
        
    }

}