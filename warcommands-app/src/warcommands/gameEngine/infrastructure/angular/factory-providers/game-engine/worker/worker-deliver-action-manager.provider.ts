import { WorkerDeliverActionManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/worker-deliver-action-manager.service';

const factory = () => {
    return new WorkerDeliverActionManagerService();
};

export const provider = {
    provide: WorkerDeliverActionManagerService,
    useFactory: factory,
    deps: []
};