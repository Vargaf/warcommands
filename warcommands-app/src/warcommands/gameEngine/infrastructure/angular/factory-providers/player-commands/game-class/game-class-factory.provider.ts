import { GameClassFactoryService } from 'src/warcommands/gameEngine/domain/player-commands/game-class/services/game-class-factory.service';
import { GameClassService } from 'src/warcommands/gameEngine/domain/player-commands/game-class/services/game-class.service';

const factory = (
    gameClassService: GameClassService
    ) => {
    return new GameClassFactoryService(gameClassService);
};

export const provider = {
    provide: GameClassFactoryService,
    useFactory: factory,
    deps: [
        GameClassService
    ]
};
