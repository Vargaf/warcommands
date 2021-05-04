import { InMemoryGameLogicActionsRepositoryService } from "../../../memory-repository/game-logic-actions/in-memory-game-logic-actions-repository.service";

const factory = () => {
    return new InMemoryGameLogicActionsRepositoryService();
};

export const provider = {
    provide: InMemoryGameLogicActionsRepositoryService,
    useFactory: factory,
    deps: []
};