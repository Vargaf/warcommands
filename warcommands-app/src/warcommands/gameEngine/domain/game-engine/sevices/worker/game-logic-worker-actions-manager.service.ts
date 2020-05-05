import { UnitsRepositoryService } from '../../../units/services/units-repository.service';
import { WorkerUnitDTO } from '../../../units/worker/worker-unit.dto';
import { UnitActionTypeENUM } from '../../../units/unit-actions/unit-action-type.enum';
import { WorkerMoveActionManagerService } from './worker-move-action-manager.service';
import { MoveToActionManagerService } from '../actions/move-to-action-manager-service';
import { UnitSuperAcionRepositopriService } from '../../../units/unit-actions/unit-super-action-repository.service';
import { UnitSuperActionDTO } from '../../../units/unit-actions/unit-super-action.dto';
import { UnitSuperActionStatusENUM } from '../../../units/unit-actions/unit-super-action-status.enum';
import { UnitActionGenericDTO } from '../../../units/unit-actions/unit-action-generic.dto';
import { WorkerHarvestActionManagerService } from './worker-harvest-action-manager.service';
import { WorkerDeliverActionManagerService } from './worker-deliver-action-manager.service';
import { UnitActionStatusENUM } from '../../../units/unit-actions/unit-action-status.enum';
import { UnitActionMoveToDTO } from '../../../units/unit-actions/unit-action-move-to.dto';
import { UnitTypeENUM } from '../../../units/model/unit-type.enum';
import { WorkerUnitRoleENUM } from '../../../units/worker/worker-unit-role.enum';
import { BuildingDTO } from '../../../building/model/building.dto';
import { BuildingsRepositoryService } from '../../../building/services/buildings-repository.service';
import { BuildingTypeEnum } from '../../../building/model/building-type.enum';
import { FarmBuildingDTO } from '../../../building/model/farm-building.dto';
import { UnitActionRewindDTO } from '../../../units/unit-actions/unit-action-rewind.dto';
import { BaseBuildingDTO } from '../../../building/base/base-building.dto';
import { GameLogicInitializeWorkerActionsService } from './game-logic-initialize-worker-actions.service';

export class GameLogicWorkerActionsManagerService {

    private readonly atomicActionsNumber = 5;

    constructor(
        private readonly gameLogicInitializeWorkerActionsService: GameLogicInitializeWorkerActionsService
    ) {}

    workerActions(): void {
        this.gameLogicInitializeWorkerActionsService.initializeActions();
    }
}