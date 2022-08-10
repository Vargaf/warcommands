import { GameTutorialService } from "src/warcommands/tutorial/domain/tutorial/services/game-tutorial.service";
import {
    GameTutorialRepository
} from "../../../../domain/tutorial/services/game-tutorial-repository.interface";
import {EventBusInterface} from "../../../../../shared/domain/event-bus/event-bus-interface";

const factory = (
    gameTutorialRepository: GameTutorialRepository,
    eventBus: EventBusInterface
) => {
    return new GameTutorialService(
        gameTutorialRepository,
        eventBus
    )
};

export const provider = {
    provide: GameTutorialService,
    useFactory: factory,
    deps: [ 'GameTutorialRepository', 'EventBusInterface' ]
};
