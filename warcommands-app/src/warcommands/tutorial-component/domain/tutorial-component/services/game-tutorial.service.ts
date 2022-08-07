import { GameTutorialRepository } from "./game-tutorial-repository.interface";
import {EventBusInterface} from "../../../../shared/domain/event-bus/event-bus-interface";
import {TutorialStartedEvent} from "../events/tutorial-started.event";

export class GameTutorialService {

    constructor(
        private gameTutorialRepository: GameTutorialRepository,
        private eventBus: EventBusInterface
    ) {}

    isFirstTime(): boolean {
        return !this.gameTutorialRepository.hasGameTutorialAlreadyStarted();
    }

    start(): void {
        this.gameTutorialRepository.tutorialStarted();
        this.eventBus.cast(new TutorialStartedEvent());
    }
}
