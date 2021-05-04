import { Scene } from "aframe";
import { GameEngineInterface } from "src/warcommands/game-middleware/game-engine.interface";
import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { GameLogicActionDTO } from "src/warcommands/game-middleware/model/game-logic-actions/game-logic-action.dto";
import { MapDTO } from "src/warcommands/game-middleware/model/map/map.dto";
import { ResourcesDTO } from "src/warcommands/game-middleware/model/resources/reources.dto";
import { UnitGenericDTO } from "src/warcommands/game-middleware/model/unit/unit-generic.dto";
import { AframeMapService } from '../../infrastructure/aframe/aframe-map.service';
import { AframeSceneService } from "../../infrastructure/aframe/aframe-scene.service";
import { AFrameComponentsHub } from "../../infrastructure/aframe/components/aframe-components-hub";
import { BuildingsManagerService } from '../buildings/service/buildings-manager-service';
import { GameLogicActionsManager } from "../game-logic-actions/services/game-logic-actions-manager.service";
import { PlayerDTO } from "../players/model/player.dto";
import { PlayerRepositoryService } from "../players/services/player-repository.service";
import { UnitsManagerService } from "../units/services/units-manager.service";
import { GameLogicClockService } from "./game-logic-clock.service";

export class VrModeGameEngineService extends GameEngineInterface {

    constructor(
        private readonly aframeComponentsHub: AFrameComponentsHub,
        private readonly aframeSceneService: AframeSceneService,
        private readonly aframeMapService: AframeMapService,
        private readonly buildingManagerService: BuildingsManagerService,
        private readonly playerRepository: PlayerRepositoryService,
        private readonly unitsManagerService: UnitsManagerService,
        private readonly timeFrameService: GameLogicClockService,
        private readonly gameLogicActionsManager: GameLogicActionsManager,
    ) {
        super();
        this.aframeComponentsHub.initialize();
    }

    waitTillSceneInitializes(sceneElement: Scene): Promise<boolean> {

        this.aframeSceneService.setSceneElement(sceneElement);

        if(this.isInitialized) {
            return Promise.resolve(true);
        }
        
        return new Promise((resolve, reject) => {
            sceneElement.addEventListener('loaded', () => {
                this.isInitialized = true;
                resolve(true);
            });
        });
    }

    loadAssets() {

    }
    
    pauseGame(): void {
        this.timeFrameService.stop();
        this.aframeSceneService.pause();
    }
    
    resumeGame(): void {
        this.timeFrameService.start();
        this.aframeSceneService.resume();
    }

    generateMap(map: MapDTO): void {
        this.aframeMapService.createMap(map);
    }

    addBuilding(building: BuildingDTO): void {
        this.buildingManagerService.addBuilding(building);
    }

    spawningUnit(unit: UnitGenericDTO, spawnFinish: number, spawnStart: number): void {
        console.log("spawningUnit not implemented.");
    }

    queueingUnit(unit: UnitGenericDTO): void {
        console.log("queueingUnit not implemented.");
    }

    buildingRemoveUnitFromQueue(unit: UnitGenericDTO): void {
        console.log("buildingRemoveUnitFromQueue not implemented.");
    }

    unitSpawned(unit: UnitGenericDTO): void {
        this.unitsManagerService.unitSpawned(unit);
    }

    unitMoving(unit: UnitGenericDTO): void {
        this.unitsManagerService.unitMoving(unit);
    }

    updateBaseResources(baseId: string, resources: ResourcesDTO): void {
        console.log("updateBaseResources not implemented.");
    }

    setCurrentPlayer(player: PlayerDTO): void {
        this.playerRepository.save(player);
    }

    gameLogicActionUpdate(action: GameLogicActionDTO): void {
        this.gameLogicActionsManager.processAction(action);
    }
    
}