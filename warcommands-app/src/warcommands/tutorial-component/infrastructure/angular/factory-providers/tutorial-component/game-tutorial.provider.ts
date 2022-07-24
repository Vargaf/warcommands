import { GameTutorialService } from "src/warcommands/tutorial-component/domain/tutorial-component/services/game-tutorial.service";

const factory = () => {
    return new GameTutorialService()
};

export const provider = {
    provide: GameTutorialService,
    useFactory: factory,
    deps: []
};
