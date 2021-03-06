import { Injectable } from "@angular/core";
import { Store, select } from '@ngrx/store';
import * as UxUiSelectors from 'src/ngrx/commands-panel/ux-ui/selectors';
import * as UxUiActions from 'src/ngrx/commands-panel/ux-ui/actions';
import { Observable } from 'rxjs';

interface WindowsSize {
    width: number | null,
    height: number | null
}

@Injectable({
    providedIn: 'root'
})
export class UxUiNgrxRepositoryService {

    constructor(
        private readonly store: Store<UxUiSelectors.UxUiFeatureState>
    ) {}

    loadWindowSize(width: number, height: number): void {
        this.store.dispatch(UxUiActions.loadWindowsSize({ width, height }))
    }

    watchWindowsSize(): Observable<WindowsSize> {
        return this.store.pipe(select(UxUiSelectors.windowSizeSelector));
    }

    startDraggingACommandFromCommandList(): void {
        this.store.dispatch(UxUiActions.setCommandListDraggingStatus({ isDragging: true }));
    }

    endDraggingACommandFromCommandList(): void {
        this.store.dispatch(UxUiActions.setCommandListDraggingStatus({ isDragging: false }));
    }

    watchIsUserDraggingACommandFromCommandList(): Observable<boolean> {
        return this.store.pipe(select(UxUiSelectors.isUserDraggingACommand));
    }

}