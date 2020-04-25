import { GameLogicSpawningUnitsManager } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-spawning-units-manager.service';
import { EnqueueUnitsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/enqueue-units-manager.service';
import { SpawnUnitsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/spawn-units-manager.service';

const factory = (
    enqueueUnitsManagerService: EnqueueUnitsManagerService,
    spawnUnitsManagerService: SpawnUnitsManagerService,
) => {
    return new GameLogicSpawningUnitsManager(
        enqueueUnitsManagerService,
        spawnUnitsManagerService
    )
};

export const provider = {
    provide: GameLogicSpawningUnitsManager,
    useFactory: factory,
    deps: [
        EnqueueUnitsManagerService,
        SpawnUnitsManagerService
    ]
};