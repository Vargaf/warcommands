import { WorkerHarvestActionManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/worker-harvest-action-manager.service';

const factory = () => {
    return new WorkerHarvestActionManagerService();
};

export const provider = {
    provide: WorkerHarvestActionManagerService,
    useFactory: factory,
    deps: []
};