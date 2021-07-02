import { OverlayRef } from "@angular/cdk/overlay";
import { ElementRef } from "@angular/core";
import { Subject, Subscription } from "rxjs";

export interface OverlayCloseEvent {
    type: 'backdropClick' | 'close';
    data: any;
   }

export class TutorialOverlayRefService {

    private afterClosed$ = new Subject<OverlayCloseEvent>();

    constructor( private overlayRef: OverlayRef, relatedElement?: ElementRef<HTMLElement> ) {
        
        // Subscribe to a stream that emits when the backdrop was clicked
        overlayRef.backdropClick().subscribe(() => {
            this._close('backdropClick');
        });
    }

    close(data: any = null): void {
        this._close('close', data);
    }

    afeterClosedSubscription(fn: () => void): Subscription {
        const subscription = this.afterClosed$.subscribe(() => {
            fn();
        })

        return subscription;
    }

    private _close(type: 'backdropClick' | 'close', data: any = null) {
        this.overlayRef.dispose();
        this.afterClosed$.next({
         type,
         data
        });
      
        this.afterClosed$.complete();
       }

}