import * as AFrame from 'aframe';
import { GameEngineInterface } from "src/warcommands/game-middleware/game-engine.interface";
import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { MapDTO } from "src/warcommands/game-middleware/model/map/map.dto";
import { ResourcesDTO } from "src/warcommands/game-middleware/model/resources/reources.dto";
import { UnitGenericDTO } from "src/warcommands/game-middleware/model/unit/unit-generic.dto";
import { AframeMapService } from '../../infrastructure/aframe/aframe-map.service';
import { AframeSceneService } from "../../infrastructure/aframe/aframe-scene.service";

export class VrModeGameEngineService extends GameEngineInterface {

    constructor(
        private readonly aframeSceneService: AframeSceneService,
        private readonly aframeMapService: AframeMapService,
        ) {
        super();
    }

    waitTillSceneInitializes(sceneElement: AFrame.Scene): Promise<boolean> {

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
        throw new Error("Method not implemented.");
    }
    
    resumeGame(): void {
        throw new Error("Method not implemented.");
    }

    generateMap(map: MapDTO): void {
        //throw new Error("Method not implemented.");
        this.aframeMapService.createMap(map);
    }

    addBuilding(building: BuildingDTO): void {
        //throw new Error("Method not implemented.");
    }

    spawningUnit(unit: UnitGenericDTO, spawnFinish: number, spawnStart: number): void {
        throw new Error("Method not implemented.");
    }

    queueingUnit(unit: UnitGenericDTO): void {
        throw new Error("Method not implemented.");
    }

    buildingRemoveUnitFromQueue(unit: UnitGenericDTO): void {
        throw new Error("Method not implemented.");
    }

    unitSpawned(unit: UnitGenericDTO): void {
        throw new Error("Method not implemented.");
    }

    unitMoving(unit: UnitGenericDTO): void {
        throw new Error("Method not implemented.");
    }

    updateBaseResources(baseId: string, resources: ResourcesDTO): void {
        throw new Error("Method not implemented.");
    }
    
}