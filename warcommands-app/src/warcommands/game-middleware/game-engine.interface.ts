import { BuildingDTO } from "./model/building/building.dto";
import { GameLogicActionDTO } from "./model/game-logic-actions/game-logic-action.dto";
import { MapDTO } from "./model/map/map.dto";
import { ResourcesDTO } from "./model/resources/reources.dto";
import { UnitGenericDTO } from "./model/unit/unit-generic.dto";

export abstract class GameEngineInterface {

    protected isInitialized = false;

    initialize() {
        if(!this.isInitialized) {
            throw new Error('The game engine is not initialized.');
        }
    }
    
    abstract pauseGame(): void;

    abstract resumeGame(): void;

    abstract generateMap(map: MapDTO): void;

    abstract addBuilding(building: BuildingDTO): void;

    abstract spawningUnit(unit: UnitGenericDTO, spawnFinish: number, spawnStart: number): void;

    abstract queueingUnit(unit: UnitGenericDTO): void;

    abstract buildingRemoveUnitFromQueue(unit: UnitGenericDTO): void;

    abstract unitSpawned(unit: UnitGenericDTO): void;

    abstract updateBaseResources(baseId: string, resources: ResourcesDTO): void;

    abstract gameLogicActionUpdate(action: GameLogicActionDTO): void;
}