import { WorkerMoveActionManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/worker-move-action-manager.service';
import { PathFindingManagerService } from 'src/warcommands/gameEngine/domain/maps/services/path-finding-manager.service';

const factory = (
    pathFindingManager: PathFindingManagerService,
) => {
    return new WorkerMoveActionManagerService(
        pathFindingManager,
    );
};

export const provider = {
    provide: WorkerMoveActionManagerService,
    useFactory: factory,
    deps: [
        PathFindingManagerService,
    ]
};