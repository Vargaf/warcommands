import { UnitsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/units/services/units-manager.service';
import { InMemoryBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-buildings-repository.service';
import { InMemoryUnitsRepositoryService } from '../../../memory-repository/unit/in-memory-units-repository-service';

const factory = (
    buildingsRepositoryService: InMemoryBuildingsRepositoryService,
    unitsRepositoryService: InMemoryUnitsRepositoryService
) => {
    return new UnitsManagerService(
        buildingsRepositoryService,
        unitsRepositoryService
    );
};

export const provider = {
    provide: UnitsManagerService,
    useFactory: factory,
    deps: [
        InMemoryBuildingsRepositoryService,
        InMemoryUnitsRepositoryService
    ]
};
