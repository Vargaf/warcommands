import { WorkerClassService } from 'src/warcommands/gameEngine/domain/player-commands/worker-class/services/worker-class.service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/unit/in-memory-units-repository-service';

const factory = (
    unitsRepositoryService: UnitsRepositoryService
) => {
    return new WorkerClassService(
        unitsRepositoryService
    );
};

export const provider = {
    provide: WorkerClassService,
    useFactory: factory,
    deps: [
        InMemoryUnitsRepositoryService
    ]
};
