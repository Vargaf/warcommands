import { WorkerClassService } from 'src/warcommands/gameEngine/domain/player-commands/worker-class/services/worker-class.service';
import { WorkerClassFactoryService } from 'src/warcommands/gameEngine/domain/player-commands/worker-class/services/worker-class-factory.service';


const factory = (
    workerClassService: WorkerClassService
    ) => {
    return new WorkerClassFactoryService(
        workerClassService
    );
};

export const provider = {
    provide: WorkerClassFactoryService,
    useFactory: factory,
    deps: [
        WorkerClassService
    ]
};
