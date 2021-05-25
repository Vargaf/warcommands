import { BuildingDTO, SpawnerBuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { BaseBuildingManagerService } from "src/warcommands/vr-mode/domain/buildings/service/base-building-manager.service";
import { AFrameComponentNameListENUM } from "../components/aframe-component-name-list.enum";
import { AFramePausableContentService } from "../game-engine/aframe-pausable-content.service";


export class AframeBaseBuildingManagerService implements BaseBuildingManagerService{

    private aframeBuildingList: Map<string,any> = new Map();

    constructor(
        private readonly pausableContentService: AFramePausableContentService
    ) {
        
    }

	addBase(building: BuildingDTO): void {
        const base = this.pausableContentService.getBaseFromPool();
        base.play();
        
        base.addEventListener('object3dset', (event: any) => {    
            base.setAttribute(AFrameComponentNameListENUM.Base, { 'building': building });
            base.setAttribute(AFrameComponentNameListENUM.PlayerColor, { 'playerId': building.playerId });
        });

        base.setAttribute('position', { x: building.xCoordinate, y: 0, z: building.yCoordinate });
        this.aframeBuildingList.set(building.id, base);
    }

    spawnUnit(building: SpawnerBuildingDTO): void {
        const aframeElement = this.aframeBuildingList.get(building.id);
        aframeElement.setAttribute(AFrameComponentNameListENUM.Base, { 'unitSpawning': building.unitSpawning });
    }

}