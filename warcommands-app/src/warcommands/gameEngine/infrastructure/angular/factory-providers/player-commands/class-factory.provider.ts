import { ClassFactoryService } from 'src/warcommands/gameEngine/domain/player-commands/class-factory.service';
import { GameClassFactoryService } from 'src/warcommands/gameEngine/domain/player-commands/game-class/services/game-class-factory.service';
import { BaseClassFactoryService } from 'src/warcommands/gameEngine/domain/player-commands/base-class/services/base-class-factory.service';
import { WorkerClassFactoryService } from 'src/warcommands/gameEngine/domain/player-commands/worker-class/services/worker-class-factory.service';
import { ArrayClassFactoryService } from 'src/warcommands/gameEngine/domain/player-commands/array-class/services/array-class-factory.service';

const factory = (
    gameClassFactoryService: GameClassFactoryService,
    baseClassFactoryService: BaseClassFactoryService,
    workerClassFactoryService: WorkerClassFactoryService,
    arrayClassFactoryService: ArrayClassFactoryService
    ) => {
    return new ClassFactoryService(
        gameClassFactoryService,
        baseClassFactoryService,
        workerClassFactoryService,
        arrayClassFactoryService
        );
};

export const provider = {
    provide: ClassFactoryService,
    useFactory: factory,
    deps: [
        GameClassFactoryService,
        BaseClassFactoryService,
        WorkerClassFactoryService,
        ArrayClassFactoryService
    ]
};
