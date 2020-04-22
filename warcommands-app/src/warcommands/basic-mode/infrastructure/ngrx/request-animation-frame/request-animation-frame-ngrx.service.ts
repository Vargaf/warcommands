import { RequestAnimationFrameService } from 'src/warcommands/basic-mode/domain/request-animation-frame/request-animation-frame.service';
import { Store, select } from '@ngrx/store';
import * as RequestAnimationFrameActions from 'src/ngrx/basic-mode/requestAnimationFrame/actions';
import * as RequestAnimationFrameSelectors from 'src/ngrx/basic-mode/requestAnimationFrame/selectors';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RequestAnimationFrameNgrxService implements RequestAnimationFrameService {

    private previousTime: number = 0;
    private currentTime: number = 0;

    constructor(
        private readonly store: Store<RequestAnimationFrameSelectors.RequestAnimationFrameState>
    ) {
        this.previousTime = (performance || Date ).now();
        this.currentTime = this.previousTime;
    }

    /*
    updateFrameId(frameId: number): void {
        this.store.dispatch(RequestAnimationFrameActions.updateFrame({ frameId }));
    }

    getFrameId(): Observable<number> {
        return this.store.pipe(select(RequestAnimationFrameSelectors.selectFrameId));
    }
    */

    updateFrameTime(): void {
        this.previousTime = this.currentTime;
        this.currentTime = (performance || Date ).now();
        this.store.dispatch(RequestAnimationFrameActions.updateFrame({ frameId: this.currentTime }));
    }

    onUpdateFrame(): Observable<number> {
        return this.store.pipe(select(RequestAnimationFrameSelectors.selectFrameId));
    }

    getPreviousTime(): number {
        return this.previousTime;
    }

    getCurrentTime(): number {
        return this.currentTime;
    }

}
