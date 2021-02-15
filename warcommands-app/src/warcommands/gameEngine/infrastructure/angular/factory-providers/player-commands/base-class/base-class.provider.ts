import { BaseClassService } from 'src/warcommands/gameEngine/domain/player-commands/base-class/services/base-class-service';
import { EnqueueUnitsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/enqueue-units-manager.service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/unit/in-memory-units-repository-service';

const factory = (
    enqueueUnitsManagerService: EnqueueUnitsManagerService,
    unitsRepositoryService: UnitsRepositoryService,
) => {
    return new BaseClassService(
        enqueueUnitsManagerService,
        unitsRepositoryService
    );
};

export const provider = {
    provide: BaseClassService,
    useFactory: factory,
    deps: [
        EnqueueUnitsManagerService,
        InMemoryUnitsRepositoryService
    ]
};
