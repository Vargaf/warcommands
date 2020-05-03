import { UnitsRepositoryService } from '../../../units/services/units-repository.service';
import { WorkerUnitDTO } from '../../../units/worker/worker-unit.dto';
import { UnitActionTypeENUM } from '../../../units/unit-actions/unit-action-type.enum';
import { WorkerMoveActionManagerService } from './worker-move-action-manager.service';
import { MoveToActionManagerService } from '../actions/move-to-action-manager-service';

export class GameLogicWorkerActionsManagerService {

    constructor(
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly workerMoveActionManager: WorkerMoveActionManagerService,
        private readonly moveToActionManager: MoveToActionManagerService
    ) {}

    workerActions(): void {
        const workerList = this.unitsRepositoryService.getAll();

        for (const worker of workerList) {
            this.assignAction((worker as WorkerUnitDTO));
            this.handleAction((worker as WorkerUnitDTO));
        }
    }

    private assignAction(worker: WorkerUnitDTO): void {
        if (!this.hasAction(worker)) {
            this.setInitialAction(worker);
        } else {
            // check action status in the case of needing a change
        }
    }

    private hasAction(worker: WorkerUnitDTO): boolean {
        return worker.action !== null;
    }

    private setInitialAction(worker: WorkerUnitDTO): void {
        this.workerMoveActionManager.setAction(worker);
    }

    private handleAction(worker: WorkerUnitDTO): void {
        if(worker.action) {
            if (worker.action.type === UnitActionTypeENUM.MoveTo) {
                this.moveToActionManager.moveUnit(worker);
            }
        }
    }

}