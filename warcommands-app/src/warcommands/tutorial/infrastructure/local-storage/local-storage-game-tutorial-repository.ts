import { GameTutorialRepository } from "../../domain/tutorial/services/game-tutorial-repository.interface";

const TUTORIAL_WELCOME_STEP_FINISHED = 'tutorialWelcomeStepFinished';

export class LocalStorageGameTutorialRepository implements GameTutorialRepository {

    isWelcomeStepFinished(): boolean {
        let tutorialWelcomeStepFinished = localStorage.getItem( TUTORIAL_WELCOME_STEP_FINISHED );
        let result = false;
        if( tutorialWelcomeStepFinished === '1' ) {
            result = true;
        }
        return result;
    }

    finishWelcomeStep(): void {
        localStorage.setItem( TUTORIAL_WELCOME_STEP_FINISHED, '1' );
    }
}
