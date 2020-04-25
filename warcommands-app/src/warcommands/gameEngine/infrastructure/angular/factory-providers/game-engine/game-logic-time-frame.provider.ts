import { GameLogicTimeFrameService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-time-frame.service';

const factory = () => {
    return new GameLogicTimeFrameService();
};

export const provider = {
    provide: GameLogicTimeFrameService,
    useFactory: factory,
    deps: []
};