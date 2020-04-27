import { BuildingsManagerService } from 'src/warcommands/gameEngine/domain/building/services/buildings-manager.service';
import { InMemoryBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-buildings-repository.service';
import { InMemorySpawningBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-spawning-buildings-repository.service';
import { MapBlockedTilesManagerService } from 'src/warcommands/gameEngine/domain/maps/services/map-blocked-tiles-manager.service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';

const factory = (
    buildingsRepositoryService: InMemoryBuildingsRepositoryService,
    spawningBuildingsRepositoryService: InMemorySpawningBuildingsRepositoryService,
    mapBlockedTilesManagerService: MapBlockedTilesManagerService,
    gameEventBusService: GameEventBusService,
    ) => {
    return new BuildingsManagerService(
        buildingsRepositoryService,
        spawningBuildingsRepositoryService,
        mapBlockedTilesManagerService,
        gameEventBusService
        );
};

export const provider = {
    provide: BuildingsManagerService,
    useFactory: factory,
    deps: [
        InMemoryBuildingsRepositoryService,
        InMemorySpawningBuildingsRepositoryService,
        MapBlockedTilesManagerService,
        GameEventBusService
    ]
};