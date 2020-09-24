import { WorkerSetRoleManagerService } from "../../../../../domain/player-commands/worker-class/services/worker-set-role-manager.service";
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/unit/in-memory-units-repository-service';
import { UnitSuperAcionRepositopriService } from 'src/warcommands/gameEngine/domain/units/unit-actions/unit-super-action-repository.service';
import { InMemoryUnitSuperActionRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/unit/in-memory-unit-super-action-repository.service';
import { BuildingsRepositoryService } from 'src/warcommands/gameEngine/domain/building/services/buildings-repository.service';
import { InMemoryBuildingsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/build/in-memory-buildings-repository.service';

const factory = (
    unitsRepositoryService: UnitsRepositoryService,
    unitSuperActionRepositoryService: UnitSuperAcionRepositopriService,
    buildingsRepositoryService: BuildingsRepositoryService,
) => {
    return new WorkerSetRoleManagerService(
        unitsRepositoryService,
        unitSuperActionRepositoryService,
        buildingsRepositoryService
    );
};

export const provider = {
    provide: WorkerSetRoleManagerService,
    useFactory: factory,
    deps: [
        InMemoryUnitsRepositoryService,
        InMemoryUnitSuperActionRepositoryService,
        InMemoryBuildingsRepositoryService
    ]
};