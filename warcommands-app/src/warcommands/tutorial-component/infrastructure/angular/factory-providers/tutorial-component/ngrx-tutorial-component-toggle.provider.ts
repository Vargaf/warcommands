import { NgrxTutorialComponentToggleService } from "src/warcommands/tutorial-component/infrastructure/ngrx/turotial-component/ngrx-tutorial-component-toggle.service";
import { Store } from "@ngrx/store";
import * as TutorialComponentSelector from "src/ngrx/tutorial-component/selectors";

const factory = (
    store: Store<TutorialComponentSelector.TutorialFeatureState>
) => {
    return new NgrxTutorialComponentToggleService(
        store
    );
};

export const provider = {
    provide: NgrxTutorialComponentToggleService,
    useFactory: factory,
    deps: [
        Store
    ]
};
