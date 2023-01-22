import { createAction, props } from "@ngrx/store";
import { Tutorial } from "../../../app/tutorial/model/Tutorial";

const tutorialStepsNamespace = '[Tutorial steps]';
export const addTutorial = createAction(tutorialStepsNamespace + ' Add a tutorial', props<{tutorial: Tutorial}>());

export const stepVisited = createAction(tutorialStepsNamespace + ' Step visited', props<{tutorial: Tutorial}>());
