import { WorkerClassService } from 'src/warcommands/gameEngine/domain/player-commands/worker-class/services/worker-class.service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/unit/in-memory-units-repository-service';
import { WorkerSetRoleManagerService } from 'src/warcommands/gameEngine/domain/player-commands/worker-class/services/worker-set-role-manager.service';

const factory = (
    unitsRepositoryService: UnitsRepositoryService,
    workerSetRoleManagerService: WorkerSetRoleManagerService,
) => {
    return new WorkerClassService(
        unitsRepositoryService,
        workerSetRoleManagerService,
    );
};

export const provider = {
    provide: WorkerClassService,
    useFactory: factory,
    deps: [
        InMemoryUnitsRepositoryService,
        WorkerSetRoleManagerService,
    ]
};
