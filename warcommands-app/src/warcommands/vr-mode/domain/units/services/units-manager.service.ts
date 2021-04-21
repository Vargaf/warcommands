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

}