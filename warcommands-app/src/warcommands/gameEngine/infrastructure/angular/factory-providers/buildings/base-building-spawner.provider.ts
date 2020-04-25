import { BaseBuildingSpawnerService } from 'src/warcommands/gameEngine/domain/building/base/base-building-spawner.service';

const factory = () => {
    return new BaseBuildingSpawnerService();
};

export const provider = {
    provide: BaseBuildingSpawnerService,
    useFactory: factory,
    deps: []
};