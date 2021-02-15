import { BuildingSpawnerServiceFactory } from 'src/warcommands/gameEngine/domain/game-engine/sevices/building-spawner-service.factory';
import { BaseBuildingSpawnerService } from 'src/warcommands/gameEngine/domain/building/base/base-building-spawner.service';

const factory = (
    baseBuildingSpawnerService: BaseBuildingSpawnerService
) => {
    return new BuildingSpawnerServiceFactory(
        baseBuildingSpawnerService
    );
};

export const provider = {
    provide: BuildingSpawnerServiceFactory,
    useFactory: factory,
    deps: [
        BaseBuildingSpawnerService
    ]
};