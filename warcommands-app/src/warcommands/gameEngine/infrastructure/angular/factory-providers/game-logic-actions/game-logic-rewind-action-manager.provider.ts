import { GameLogicRewindActionManagerService } from "../../../../domain/game-logic-actions/game-logic-rewind-action-manager.service";

const factory = () => {
    return new GameLogicRewindActionManagerService();
};

export const provider = {
    provide: GameLogicRewindActionManagerService,
    useFactory: factory,
    deps: []
};