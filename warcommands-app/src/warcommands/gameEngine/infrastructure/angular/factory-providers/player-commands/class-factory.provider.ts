import { ClassFactoryService } from 'src/warcommands/gameEngine/domain/player-commands/class-factory.service';
import { GameClassFactoryService } from 'src/warcommands/gameEngine/domain/player-commands/game-class/services/game-class-factory.service';

const factory = (
    gameClassFactoryService: GameClassFactoryService
    ) => {
    return new ClassFactoryService(gameClassFactoryService);
};

export const provider = {
    provide: ClassFactoryService,
    useFactory: factory,
    deps: [
        GameClassFactoryService
    ]
};
