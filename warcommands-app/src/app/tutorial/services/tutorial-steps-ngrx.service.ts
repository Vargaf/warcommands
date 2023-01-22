import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as TutorialStepsSelectors from 'src/ngrx/tutorial-component/tutorial-steps/selectors';
import * as TutorialStepsActions from 'src/ngrx/tutorial-component/tutorial-steps/actions';
import { Tutorial } from "../model/Tutorial";
import { Observable } from "rxjs";
import { TutorialStep as TutorialStepNgrx } from "../../../ngrx/tutorial-component/tutorial-steps/reducers";

@Injectable()
export class TutorialStepsNgrxService {

    constructor(
        private readonly store: Store<TutorialStepsSelectors.TutorialStepsFeatureState>,
    ) { }

    addTutorial(tutorial: Tutorial): void {
        this.store.dispatch(TutorialStepsActions.addTutorial({ tutorial }));
    }

    onTutorialChange(tutorialName: string): Observable<Array<TutorialStepNgrx>> {
        return this.store.select(TutorialStepsSelectors.tutorialSelector(tutorialName));
    }

    stepVisited(tutorial: Tutorial): void {
        this.store.dispatch(TutorialStepsActions.stepVisited({ tutorial }));
    }

}
