export interface GameTutorialRepository {

    hasGameTutorialAlreadyStarted(): boolean;

    tutorialStarted(): void;

}
