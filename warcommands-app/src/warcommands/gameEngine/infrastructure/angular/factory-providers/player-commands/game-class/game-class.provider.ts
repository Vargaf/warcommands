import { GameClassService } from 'src/warcommands/gameEngine/domain/player-commands/game-class/services/game-class.service';

const factory = (
    ) => {
    return new GameClassService();
};

export const provider = {
    provide: GameClassService,
    useFactory: factory,
    deps: []
};
