import { select, Store } from "@ngrx/store";
import { TutorialComponentToggleServiceInterface } from "src/warcommands/tutorial/domain/tutorial/services/tutorial-component-toggle-service.interface";
import * as TutorialComponentSelector from 'src/ngrx/tutorial-component/selectors';
import * as TutorialComponentActions from 'src/ngrx/tutorial-component/actions';
import { Observable, Subject } from "rxjs";

export class NgrxTutorialComponentToggleService implements TutorialComponentToggleServiceInterface {

    private isTutorialComponentOpened!: boolean;

    private closeSubject:Subject<void> = new Subject<void>();
    private openSubject:Subject<void> = new Subject<void>();

    constructor(
        private store: Store<TutorialComponentSelector.TutorialFeatureState>
    ) {
        this.store.pipe(select(TutorialComponentSelector.isTutorialOpenedSelector)).subscribe(
            (isTutorialComponentOpened: boolean) => {
                this.isTutorialComponentOpened = isTutorialComponentOpened;

                if(isTutorialComponentOpened) {
                    this.openSubject.next();
                } else {
                    this.closeSubject.next();
                }
            }
        );
    }

    toggle(): void {
        if(this.isTutorialComponentOpened) {
            this.close();
        } else {
            this.open();
        }
    }

    open(): void {
        this.store.dispatch(TutorialComponentActions.openTutorial());
    }

    close(): void {
        this.store.dispatch(TutorialComponentActions.closeTutorial());
    }

    closeListener(): Observable<void> {
        return this.closeSubject;
    }

    openListener(): Observable<void> {
        return this.openSubject;
    }
}
