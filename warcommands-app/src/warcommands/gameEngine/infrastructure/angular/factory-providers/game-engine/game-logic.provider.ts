import { GameLogicService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic.service';

const factory = () => {
    return new GameLogicService();
};

export const provider = {
    provide: GameLogicService,
    useFactory: factory,
    deps: []
};
