import { GameLogicActionMoveToDTO } from "src/warcommands/game-middleware/model/game-logic-actions/game-logic-action-move-to.dto";
import { UnitGenericDTO } from "src/warcommands/game-middleware/model/unit/unit-generic.dto";
import { UnitsRepositoryInterface } from "./units-repository-interface";
import { WorkerUnitManagerInterface } from "./worker-unit-manager.interface";

export class UnitsManagerService {

    constructor(
        private readonly unitsRepository: UnitsRepositoryInterface,
        private readonly workerManager: WorkerUnitManagerInterface
    ) {}

    unitSpawned(unit: UnitGenericDTO): void {
        this.workerManager.addWorker(unit);
        this.unitsRepository.save(unit);
    }

    unitMoving(unit: UnitGenericDTO): void {
        this.workerManager.updateWorker(unit);
        this.unitsRepository.save(unit);

    }

    unitMoving22222222222222(action: GameLogicActionMoveToDTO): void {
        const unit = this.unitsRepository.findById(action.ownerId);
        unit.action = action;
        this.workerManager.updateWorker(unit);
        this.unitsRepository.save(unit);
    }
}