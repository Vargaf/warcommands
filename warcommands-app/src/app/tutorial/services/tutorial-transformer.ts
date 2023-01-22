import { Tutorial } from "../model/Tutorial";
import { Tutorial as TutorialNgrx } from 'src/ngrx/tutorial-component/tutorial-steps/reducers';
import { TutorialStep as TutorialStepNgrx } from 'src/ngrx/tutorial-component/tutorial-steps/reducers';

export class TutorialTransformer {

    static transform(tutorialList: Map<string, Tutorial>): Array<any> {

        let tutorialRepositoryInArray: Array<any> = [];
        tutorialList.forEach(function( tutorial ) {
            let tutorialInArray: Array<any> = [];
            tutorialInArray.push(tutorial.tutorialName());
            let tutorialStepsInArray: Array<any> = [];
            tutorial.steps.forEach(function( step ) {
                let tutorialStep: Array<any> = [];
                tutorialStep.push(step.stepName);
                tutorialStep.push(step.isAlreadyVisited());
                tutorialStepsInArray.push(tutorialStep);
            });
            tutorialInArray.push(tutorialStepsInArray);
            tutorialRepositoryInArray.push(tutorialInArray);
        })

        return tutorialRepositoryInArray;
    }

    static transformPath(tutorialList: Map<string, Tutorial>): Array<TutorialNgrx> {
        let tutorialPathInArray: Array<any> = [];
        let thisArg = this;
        tutorialList.forEach(function( tutorial ) {
            let tutorialStep: TutorialNgrx = thisArg.transformToNgrx(tutorial);
            tutorialPathInArray.push(tutorialStep)
        }, thisArg)

        return tutorialPathInArray;
    }

    static transformToNgrx(tutorial: Tutorial): TutorialNgrx {

        let tutorialName: string = tutorial.tutorialName();
        let tutorialStepList: Array<TutorialStepNgrx> = [];

        tutorial.steps.forEach((step) => {
            tutorialStepList.push({stepName: step.stepName, isAlreadyVisited: step.isAlreadyVisited() });
        });
        return { [ tutorialName ]: tutorialStepList};
    }
}
