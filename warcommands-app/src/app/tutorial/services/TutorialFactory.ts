import { Tutorial } from "../model/Tutorial";
import { TutorialStep as TutorialStepNgrx } from 'src/ngrx/tutorial-component/tutorial-steps/reducers';
import { TutorialStep } from "../model/TutorialStep";

export class TutorialFactory {

    static make(tutorialName: string, steps: Array<string>): Tutorial {
        let tutorial: Tutorial = new Tutorial(tutorialName);

        steps.forEach(function( stepName ) {
            let step: TutorialStep = new TutorialStep(stepName, false);
            tutorial.addStep(step);
        })

        return tutorial;
    }

    static makeFromArray(tutorialInArray: Array<any>): Map<string, Tutorial> {

        let tutorialList:Map<string, Tutorial> = new Map();

        tutorialInArray.forEach(function( tutorialArray ) {
            let tutorialName: string = Object.keys(tutorialArray)[0];
            let tutorialSteps: Array<any> = Object.values(tutorialArray)[0] as Array<any>;

            let tutorial: Tutorial = new Tutorial(tutorialName);
            tutorialSteps.forEach(function( stepArray: TutorialStepNgrx ) {
                let step: TutorialStep = new TutorialStep(stepArray.stepName, stepArray.isAlreadyVisited);
                tutorial.addStep(step);
            });

            tutorialList.set(tutorialName, tutorial);

        });

        return tutorialList;
    }
}
