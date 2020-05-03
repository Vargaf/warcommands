import { WorkerUnitDTO } from '../../../units/worker/worker-unit.dto';
import { BuildingsRepositoryService } from '../../../building/services/buildings-repository.service';
import { BuildingTypeEnum } from '../../../building/model/building-type.enum';
import { WorkerUnitRoleENUM } from '../../../units/worker/worker-unit-role.enum';
import { BuildingDTO } from '../../../building/model/building.dto';
import { FarmBuildingDTO } from '../../../building/model/farm-building.dto';
import { PathFindingManagerService } from '../../../maps/services/path-finding-manager.service';
import { UnitActionMoveToDTO } from '../../../units/unit-actions/unit-action-move-to.dto';
import { UnitActionTypeENUM } from '../../../units/unit-actions/unit-action-type.enum';
import { UnitActionStatusENUM } from '../../../units/unit-actions/unit-action-status.enum';
import * as _ from 'lodash';
import { UnitsRepositoryService } from '../../../units/services/units-repository.service';
import { GameLogicTimeFrameService } from '../game-logic-time-frame.service';
import { PathFindingCoordinate } from '../../../maps/model/path-finding-coordinate.dto';
import { UnitGenericDTO } from '../../../units/model/unit-generic.dto';
import { ActionUnitStartsToMoveEvent } from '../../events/action-unit-starts-to-move.event';
import { GameEventBusService } from '../../../game-event-bus/services/game-event-bus.service';
import { MapBlockedTilesManagerService } from '../../../maps/services/map-blocked-tiles-manager.service';

export class WorkerMoveActionManagerService {
    
    constructor(
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly pathFindingManager: PathFindingManagerService,
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly gameLogicTimeFrameService: GameLogicTimeFrameService,
        private readonly gameEventBusService: GameEventBusService,
        private readonly mapBlockedTilesManagerService: MapBlockedTilesManagerService,
    ) {}

    setAction(worker: WorkerUnitDTO): void {
        const buildingToMove: FarmBuildingDTO = (this.getBuildingToMove(worker) as FarmBuildingDTO);

        if (buildingToMove) {
            const action: UnitActionMoveToDTO = {
                type: UnitActionTypeENUM.MoveTo,
                actionStatus: UnitActionStatusENUM.WaitingToStart,
                data: {
                    from: {
                        xCoordinate: worker.xCoordinate,
                        yCoordinate: worker.yCoordinate
                    },
                    to: {
                        xCoordinate: buildingToMove.xCoordinate + buildingToMove.relativeEntranceCoordinates.xCoordinate,
                        yCoordinate: buildingToMove.yCoordinate + buildingToMove.relativeEntranceCoordinates.yCoordinate
                    },
                    path: []
                }
            }

            worker.action = action;
            this.pathFindingManager.findPath(worker).subscribe((path) => {
                this.setTimesToPath(worker, path);
                
            });
            this.unitsRepositoryService.save(worker);
        }
       
    }

    private setTimesToPath(worker: UnitGenericDTO, path: PathFindingCoordinate[]): void {
        path.forEach((item, index) => {
            const timeToArrive = this.gameLogicTimeFrameService.getCurrentTime() + worker.attributes.speed * index;
            item.time = timeToArrive;
        });

        this.mapBlockedTilesManagerService.freeTileByUnit(worker);

        worker.action.data.status = UnitActionStatusENUM.InProgress;
        worker.action.data.path = path;
        
        this.unitsRepositoryService.save(worker);

        const event: ActionUnitStartsToMoveEvent = new ActionUnitStartsToMoveEvent(worker);
        this.gameEventBusService.cast(event);
    }

    private getBuildingToMove(worker: WorkerUnitDTO): BuildingDTO {
        let buildingToMove: BuildingDTO;

        if (worker.role !== WorkerUnitRoleENUM.Builder) {
            buildingToMove = this.getFarmBuilding(worker);
        } else {
            // TODO
            buildingToMove = null;
        }

        return buildingToMove;
    }

    private getFarmBuilding(worker: WorkerUnitDTO): BuildingDTO {
        let buildingTypeToSearch: BuildingTypeEnum;
        const playerId = worker.playerId;
        let farmBuildingToMove: BuildingDTO = null;

        switch (worker.role) {
            case WorkerUnitRoleENUM.EnergyHarvester: {
                buildingTypeToSearch = BuildingTypeEnum.EnergyFarm;
                break;
            }
            case WorkerUnitRoleENUM.MatterHarvester: {
                buildingTypeToSearch = BuildingTypeEnum.MatterFarm;
                break;
            }
        }

        const farmBuildingList: BuildingDTO[] = this.buildingsRepositoryService.findByTypePlayer(buildingTypeToSearch, playerId);

        for (const building of farmBuildingList) {
            if (this.farmHasRoom(building)) {
                farmBuildingToMove = building;
                break;
            }
        }

        return farmBuildingToMove;
    }

    private farmHasRoom(farm: BuildingDTO): boolean {
        return (farm as FarmBuildingDTO).maxUnitRoom > (farm as FarmBuildingDTO).unitsFarmingIdList.length;
    }

}