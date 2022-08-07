import { GameTutorialRepository } from "../../domain/tutorial-component/services/game-tutorial-repository.interface";

const GAME_TUTORIAL_ALREADY_STARTED = 'gameTutorialAlreadyStarted';

export class LocalStorageGameTutorialRepository implements GameTutorialRepository {

    hasGameTutorialAlreadyStarted(): boolean {
        let gameTutorialAlreadyStarted = localStorage.getItem( GAME_TUTORIAL_ALREADY_STARTED );
        let result = false;
        if( gameTutorialAlreadyStarted === '1' ) {
            result = true;
        }
        return result;
    }

    tutorialStarted(): void {
        localStorage.setItem( GAME_TUTORIAL_ALREADY_STARTED, '1' );
    }
}
