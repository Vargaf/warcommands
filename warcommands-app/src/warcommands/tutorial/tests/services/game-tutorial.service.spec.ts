import {GameTutorialService} from "../../domain/tutorial/services/game-tutorial.service";
import {GameTutorialRepository} from "../../domain/tutorial/services/game-tutorial-repository.interface";
import {TutorialUserFirstTimeArrivedEvent} from "../../domain/tutorial/events/tutorial-user-first-time-arrived.event";


describe('Game tutorial service', () => {

    function setup() {
        const eventbusSpy = jasmine.createSpyObj('SharedEventBus', ['cast']);

        const gameTutorialRepositorySpy =
            jasmine.createSpyObj('GameTutorialRepository', ['isWelcomeStepFinished', 'finishWelcomeStep']);

        const gameTutorialService = new GameTutorialService(gameTutorialRepositorySpy, eventbusSpy);

        return {gameTutorialService, gameTutorialRepositorySpy, eventbusSpy};
    }

    it("Check the tutorial welcome step has not been already finished", () => {
        const {gameTutorialService, gameTutorialRepositorySpy} = setup();

        gameTutorialRepositorySpy.isWelcomeStepFinished.and.returnValue(false);

        let isWelcomeStepFinished = gameTutorialService.isWelcomeStepFinished();
        expect(false).toEqual(isWelcomeStepFinished);
    });

    it('Open the tutorial welcome step if it is not already finished', () => {
        const {gameTutorialService, gameTutorialRepositorySpy, eventbusSpy} = setup();

        gameTutorialRepositorySpy.isWelcomeStepFinished.and.returnValue(false);
        
        const tutorialStartEvent = new TutorialUserFirstTimeArrivedEvent();

        gameTutorialService.openWelcomeStep();

        expect(eventbusSpy.cast).toHaveBeenCalledOnceWith(tutorialStartEvent);
    });

    it('Do not open the tutorial welcome step when is already been finished', () => {
        const {gameTutorialService, gameTutorialRepositorySpy, eventbusSpy} = setup();

        gameTutorialRepositorySpy.isWelcomeStepFinished.and.returnValue(true);

        gameTutorialService.openWelcomeStep();

        expect(eventbusSpy.cast).toHaveBeenCalledTimes(0);
    });
});
