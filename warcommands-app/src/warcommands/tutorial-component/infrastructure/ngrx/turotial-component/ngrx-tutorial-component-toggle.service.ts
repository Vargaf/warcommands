import { select, Store } from "@ngrx/store";
import { TutorialComponentToggleServiceInterface } from "src/warcommands/tutorial-component/domain/tutorial-component/services/tutorial-component-toggle-service.interface";
import * as TutorialComponentSelector from 'src/ngrx/tutorial-component/selectors';
import * as TutorialComponentActions from 'src/ngrx/tutorial-component/actions';
import { Observable, Subject } from "rxjs";
import { first } from "rxjs/operators";

export class NgrxTutorialComponentToggleService implements TutorialComponentToggleServiceInterface {

    private isTutorialComponentOpened!: boolean;

    private closeSubject:Subject<void> = new Subject<void>();
    private openSubject:Subject<void> = new Subject<void>();

    constructor(
        private store: Store<TutorialComponentSelector.TutorialFeatureState>
    ) {
        this.store.pipe(select(TutorialComponentSelector.isTutorialOpenedSelector)).pipe(first()).subscribe(
            (isTutorialComponentOpened) => {
                this.isTutorialComponentOpened = isTutorialComponentOpened;
            }
        );
    }

    toggle(): void {
        if(this.isTutorialComponentOpened) {
            this.close();
        } else {
            this.open();
        }

        this.isTutorialComponentOpened = !this.isTutorialComponentOpened;
    }

    open(): void {
        this.store.dispatch(TutorialComponentActions.openTutorial());
        this.isTutorialComponentOpened = true;
        this.openSubject.next();
    }

    close(): void {
        this.store.dispatch(TutorialComponentActions.closeTutorial());
        this.isTutorialComponentOpened = false;
        this.closeSubject.next();
    }

    closeListener(): Observable<void> {
        return this.closeSubject;
    }

    openListener(): Observable<void> {
        return this.openSubject;
    }
}
