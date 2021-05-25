import { UnitsManagerService } from "src/warcommands/vr-mode/domain/units/services/units-manager.service";
import { UnitsRepositoryInterface } from "src/warcommands/vr-mode/domain/units/services/units-repository-interface";
import { WorkerUnitManagerInterface } from "src/warcommands/vr-mode/domain/units/services/worker-unit-manager.interface";


const factory = (
    unitsRepository: UnitsRepositoryInterface,
    workerManager: WorkerUnitManagerInterface,
) => {
    return new UnitsManagerService(
        unitsRepository,
        workerManager
    );
};

export const provider = {
    provide: UnitsManagerService,  
    useFactory: factory,
    deps: [
        UnitsRepositoryInterface,
        WorkerUnitManagerInterface,
    ]
};
