import { RequestAnimationFrameService } from 'src/warcommands/basic-mode/domain/request-animation-frame/request-animation-frame.service';
import { Store, select } from '@ngrx/store';
import * as RequestAnimationFrameActions from '../../../../../ngrx/requestAnimationFrame/actions';
import * as RequestAnimationFrameSelectors from '../../../../../ngrx/requestAnimationFrame/selectors';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RequestAnimationFrameNgrxService extends RequestAnimationFrameService {

    constructor(
        private readonly store: Store<RequestAnimationFrameSelectors.RequestAnimationFrameState>
    ) {
        super();
    }

    updateFrameId(frameId: number): void {
        this.store.dispatch(RequestAnimationFrameActions.updateFrame({ frameId }));
    }

    getFrameId(): Observable<number> {
        return this.store.pipe(select(RequestAnimationFrameSelectors.selectFrameId));
    }

}
