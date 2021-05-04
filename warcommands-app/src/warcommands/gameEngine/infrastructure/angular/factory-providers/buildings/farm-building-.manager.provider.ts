import { BuildingsRepositoryService } from 'src/warcommands/gameEngine/domain/building/services/buildings-repository.service';
import { FarmBuildingManager } from 'src/warcommands/gameEngine/domain/building/services/farm-building-manager.service';
import { InMemoryBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-buildings-repository.service';

const factory = (
    buildingsRepositoryService: BuildingsRepositoryService,
) => {
    return new FarmBuildingManager(
        buildingsRepositoryService,
    );
};

export const provider = {
    provide: FarmBuildingManager,
    useFactory: factory,
    deps: [
        InMemoryBuildingsRepositoryService
    ]
};