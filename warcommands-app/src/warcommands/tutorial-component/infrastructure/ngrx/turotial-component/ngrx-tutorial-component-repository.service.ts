import { select, Store } from "@ngrx/store";
import { TutorialComponentTogglerInterface } from "src/warcommands/tutorial-component/domain/tutorial-component/services/tutorial-component-toggler.interface";
import * as TutorialComponentSelector from 'src/ngrx/tutorial-component/selectors';
import * as TutorialComponentActions from 'src/ngrx/tutorial-component/actions';

export class NgrxTutorialComponentTogglerService implements TutorialComponentTogglerInterface {
    
    private isTutorialComponentOpened!: boolean;

    constructor(
        private store: Store<TutorialComponentSelector.TutorialFeatureState>
    ) {
        const isTutorialComponentOpenedSubscriber = this.store.pipe(select(TutorialComponentSelector.isTutorialOpenedSelector)).subscribe(
            (isTutorialComponentOpened) => {
                this.isTutorialComponentOpened = isTutorialComponentOpened;
                isTutorialComponentOpenedSubscriber.unsubscribe();
            }
        );
    }
    
    toggle(): void {
        if(this.isTutorialComponentOpened) {
            this.close();
        } else {
            this.open();
        }

        this.isTutorialComponentOpened != this.isTutorialComponentOpened;
    }

    open(): void {
        this.store.dispatch(TutorialComponentActions.openTutorial());
        this.isTutorialComponentOpened = true;
    }

    close(): void {
        this.store.dispatch(TutorialComponentActions.closeTutorial());
        this.isTutorialComponentOpened = false;
    }
    
}