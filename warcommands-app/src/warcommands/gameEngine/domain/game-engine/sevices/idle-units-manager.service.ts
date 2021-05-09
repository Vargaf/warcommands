import { SpawnerBuildingDTO } from "../../building/model/building.dto";
import { BuildingsRepositoryService } from "../../building/services/buildings-repository.service";
import { FarmBuildingManager } from "../../building/services/farm-building-manager.service";
import { GameLogicActionsRepositoryInterface } from "../../game-logic-actions/services/game-logic-actions-repository.interface";
import { UnitGoHarvestAndComeBackActionManager } from "../../game-logic-actions/services/unit-go-harvest-and-come-back-action-manager.service";
import { UnitMoveActionManager, UnitMoveActionManagerCreateActionsParams } from "../../game-logic-actions/services/unit-move-action-manager.service";
import { CoordinatesEntity } from "../../maps/model/coordinates.entity";
import { MapBlockedTilesManagerService } from "../../maps/services/map-blocked-tiles-manager.service";
import { tileAroundOrder } from "../../share/tile-around-order";
import { UnitGenericDTO } from "../../units/model/unit-generic.dto";
import { UnitSpawningStatusENUM } from "../../units/model/unit-spawning-status.enum";
import { UnitTypeENUM } from "../../units/model/unit-type.enum";
import { UnitsRepositoryService } from "../../units/services/units-repository.service";
import { WorkerUnitDTO } from "../../units/worker/worker-unit.dto";


export class IdleUnitsManager {

    constructor(
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly unitMoveActionManager: UnitMoveActionManager,
        private readonly mapBlockedTilesManagerService: MapBlockedTilesManagerService,
        private readonly unitGoHarvestAndComeBackActionManager: UnitGoHarvestAndComeBackActionManager,
        private readonly gamelogicActionRepository: GameLogicActionsRepositoryInterface,
        private readonly farmBuildingManager: FarmBuildingManager,
    ) {}

    execute(): void {
        const unitList: UnitGenericDTO[] = this.unitsRepositoryService.getAll();

        for(let unit of unitList) {
            if(this.isSpawned(unit) && !this.hasAction(unit)) {
                if(this.canHarvest(unit)) {
                    this.putUnitToHarvest(unit);
                } else {
                    if(this.isInTheSpawningTile(unit)) {
                        this.moveUnitToFreeTile(unit);
                    }
                }
            }
        }
    }

    private isInTheSpawningTile(unit: UnitGenericDTO): boolean {
        const building: SpawnerBuildingDTO = this.buildingsRepositoryService.findById(unit.baseId) as SpawnerBuildingDTO;
        const xCoordinate = building.xCoordinate + building.spawnRelativeCoordinates.xCoordinate;
        const yCoordinate = building.yCoordinate + building.spawnRelativeCoordinates.yCoordinate;

        return unit.xCoordinate === xCoordinate && unit.yCoordinate === yCoordinate;
    }

    private isSpawned(worker: UnitGenericDTO): Boolean {
        return worker.spawningStatus === UnitSpawningStatusENUM.Spawned
    }

    private hasAction(worker: UnitGenericDTO): boolean {
        return worker.actionId !== '';
    }

    private moveUnitToFreeTile(unit: UnitGenericDTO): void {
        const fromCoordinates: CoordinatesEntity = {
            xCoordinate: unit.xCoordinate,
            yCoordinate: unit.yCoordinate
        }
        const toCoordinates: CoordinatesEntity = this.mapBlockedTilesManagerService.getNearestFreeTile(fromCoordinates);
        const actionParams: UnitMoveActionManagerCreateActionsParams = {
            ownerId: unit.id,
            from: fromCoordinates,
            to: toCoordinates,
            checkIfEndPathIsOccupied: true,
        }
        
        const action = this.unitMoveActionManager.createAction(actionParams);
        unit.actionId = action.id;
        this.unitsRepositoryService.save(unit);
        this.gamelogicActionRepository.save(action);
    }

    private putUnitToHarvest(unit: UnitGenericDTO): void {
        const action = this.unitGoHarvestAndComeBackActionManager.createAction(unit as WorkerUnitDTO);
        unit.actionId = action.id;
        this.unitsRepositoryService.save(unit);
        this.gamelogicActionRepository.save(action);
    }

    private isFarmingUnit(unit: UnitGenericDTO): boolean {
        return unit.type === UnitTypeENUM.Worker;
    }

    private canHarvest(unit: UnitGenericDTO): boolean {
        let canHarvest = false;
        if(this.isFarmingUnit(unit)) {
            if(this.farmBuildingManager.findFarmWithFreeSpotToHarvest(<WorkerUnitDTO>unit)) {
                canHarvest = true;
            }
        }

        return canHarvest;
    }
}