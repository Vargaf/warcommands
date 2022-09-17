import { GameTutorialRepository } from "./game-tutorial-repository.interface";
import {EventBusInterface} from "../../../../shared/domain/event-bus/event-bus-interface";
import {TutorialUserFirstTimeArrivedEvent} from "../events/tutorial-user-first-time-arrived.event";

export class GameTutorialService {

    constructor(
        private gameTutorialRepository: GameTutorialRepository,
        private eventBus: EventBusInterface
    ) {}

    isWelcomeStepFinished(): boolean {
        return this.gameTutorialRepository.isWelcomeStepFinished();
    }

    openWelcomeStep(): void {
        if(!this.isWelcomeStepFinished()) {
            this.eventBus.cast(new TutorialUserFirstTimeArrivedEvent());
        }
    }

    finishWelcomeStep(): void {
        this.gameTutorialRepository.finishWelcomeStep();
    }
}
