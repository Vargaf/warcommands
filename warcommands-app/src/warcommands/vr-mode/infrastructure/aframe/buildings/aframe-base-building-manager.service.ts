import { BuildingDTO, SpawnerBuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { UnitGenericDTO } from "src/warcommands/game-middleware/model/unit/unit-generic.dto";
import { BaseBuildingManagerService } from "src/warcommands/vr-mode/domain/buildings/service/base-building-manager.service";
import { AFrameComponentNameListENUM } from "../components/aframe-component-name-list.enum";
import { AFramePausableContentService } from "../game-engine/aframe-pausable-content.service";


export class AframeBaseBuildingManagerService implements BaseBuildingManagerService{

    private aframeBaseList: Map<string,any> = new Map();

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
        this.aframeBaseList.set(building.id, base);
    }

    spawnUnit(building: SpawnerBuildingDTO): void {
        const aframeBaseElement = this.aframeBaseList.get(building.id);
        const component = aframeBaseElement.components[AFrameComponentNameListENUM.SpawningUnit];
        component.spawnUnit(building.unitSpawning.spawnStart, building.unitSpawning.spawnFinish);
    }

    unitSpawned(unit: UnitGenericDTO, building: SpawnerBuildingDTO): void {
        const aframeBaseElement = this.aframeBaseList.get(building.id);
        const component = aframeBaseElement.components[AFrameComponentNameListENUM.SpawningUnit];
        component.unitSpawned();
    }

    addUnitToQueue(unit: UnitGenericDTO, building: SpawnerBuildingDTO): void {
        const aframeBaseElement = this.aframeBaseList.get(building.id);
        const component = aframeBaseElement.components[AFrameComponentNameListENUM.SpawningQueue];
        component.addUnitToQueue();
    }

    removeUnitFromQueue(unit: UnitGenericDTO, building: SpawnerBuildingDTO): void {
        const aframeBaseElement = this.aframeBaseList.get(building.id);
        const component = aframeBaseElement.components[AFrameComponentNameListENUM.SpawningQueue];
        component.removeUnitFromQueue();
    }
}