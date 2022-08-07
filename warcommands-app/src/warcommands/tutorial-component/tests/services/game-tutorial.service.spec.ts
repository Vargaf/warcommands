import {GameTutorialService} from "../../domain/tutorial-component/services/game-tutorial.service";
import {GameTutorialRepository} from "../../domain/tutorial-component/services/game-tutorial-repository.interface";
import {TutorialStartedEvent} from "../../domain/tutorial-component/events/tutorial-started.event";


describe('Game tutorial service', () => {

    function setup() {
        const eventbusSpy = jasmine.createSpyObj('SharedEventBus', ['cast']);

        const gameTutorialRepositorySpy =
            jasmine.createSpyObj('GameTutorialRepository', ['hasGameTutorialAlreadyStarted', 'tutorialStarted']);

        const gameTutorialService = new GameTutorialService(gameTutorialRepositorySpy, eventbusSpy);

        return {gameTutorialService, gameTutorialRepositorySpy, eventbusSpy};
    }

    it("Check the tutorial has not been already opened the first time", () => {
        const {gameTutorialService, gameTutorialRepositorySpy} = setup();

        gameTutorialRepositorySpy.hasGameTutorialAlreadyStarted.and.returnValue(false);

        let isFirstTime = gameTutorialService.isFirstTime();
        expect(true).toEqual(isFirstTime);
    });

    it('When starting the tutorial we save it to do not open again and launch the tutoralStart event', () => {
        const {gameTutorialService, gameTutorialRepositorySpy, eventbusSpy} = setup();

        const tutorialStartEvent = new TutorialStartedEvent();

        gameTutorialService.start();

        expect(eventbusSpy.cast).toHaveBeenCalledOnceWith(tutorialStartEvent);
        expect(gameTutorialRepositorySpy.tutorialStarted).toHaveBeenCalled();
    });
});
