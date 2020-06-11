import { GameLogicSpawningUnitsManager } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-spawning-units-manager.service';
import { SpawnUnitsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/spawn-units-manager.service';

const factory = (
    spawnUnitsManagerService: SpawnUnitsManagerService,
) => {
    return new GameLogicSpawningUnitsManager(
        spawnUnitsManagerService
    )
};

export const provider = {
    provide: GameLogicSpawningUnitsManager,
    useFactory: factory,
    deps: [
        SpawnUnitsManagerService
    ]
};