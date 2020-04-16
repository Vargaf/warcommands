import { ClassFactoryService } from 'src/warcommands/gameEngine/domain/player-commands/class-factory.service';
import { GameClassFactoryService } from 'src/warcommands/gameEngine/domain/player-commands/game-class/services/game-class-factory.service';
import { BaseClassFactoryService } from 'src/warcommands/gameEngine/domain/player-commands/base-class/services/base-class-factory.service';

const factory = (
    gameClassFactoryService: GameClassFactoryService,
    baseClassFactoryService: BaseClassFactoryService
    ) => {
    return new ClassFactoryService(
        gameClassFactoryService,
        baseClassFactoryService
        );
};

export const provider = {
    provide: ClassFactoryService,
    useFactory: factory,
    deps: [
        GameClassFactoryService,
        BaseClassFactoryService
    ]
};
