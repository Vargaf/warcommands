import { Scene } from "aframe";
import { GameEngineInterface } from "src/warcommands/game-middleware/game-engine.interface";
import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { MapDTO } from "src/warcommands/game-middleware/model/map/map.dto";
import { ResourcesDTO } from "src/warcommands/game-middleware/model/resources/reources.dto";
import { UnitGenericDTO } from "src/warcommands/game-middleware/model/unit/unit-generic.dto";
import { AframeMapService } from '../../infrastructure/aframe/aframe-map.service';
import { AframeSceneService } from "../../infrastructure/aframe/aframe-scene.service";
import { AFrameComponentsHub } from "../../infrastructure/aframe/components/aframe-components-hub";
import { BuildingsManagerService } from '../buildings/service/buildings-manager-service';
import { PlayerDTO } from "../players/model/player.dto";
import { PlayerRepositoryService } from "../players/services/player-repository.service";
import { UnitsManagerService } from "../units/services/units-manager.service";

export class VrModeGameEngineService extends GameEngineInterface {

    constructor(
        private readonly aframeComponentsHub: AFrameComponentsHub,
        private readonly aframeSceneService: AframeSceneService,
        private readonly aframeMapService: AframeMapService,
        private readonly buildingManagerService: BuildingsManagerService,
        private readonly playerRepository: PlayerRepositoryService,
        private readonly unitsManagerService: UnitsManagerService,
        ) {
        super();
        this.aframeComponentsHub.initialize();
    }

    waitTillSceneInitializes(sceneElement: Scene): Promise<boolean> {

        this.aframeSceneService.setSceneElement(sceneElement);

        const sceneInitializedPromise: Promise<boolean> = new Promise((resolve, reject) => {

            if(this.isInitialized) {
                resolve(true);
            } else {
                sceneElement.addEventListener('loaded', () => {
                    this.isInitialized = true;
                    resolve(true);
                });
            }
        });

        return sceneInitializedPromise;
    }

    loadAssets() {

    }
    
    pauseGame(): void {
        this.aframeSceneService.pause();
    }
    
    resumeGame(): void {
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
        console.log("unitMoving not implemented.");
    }

    updateBaseResources(baseId: string, resources: ResourcesDTO): void {
        console.log("updateBaseResources not implemented.");
    }

    setCurrentPlayer(player: PlayerDTO): void {
        this.playerRepository.save(player);
    }
    
}