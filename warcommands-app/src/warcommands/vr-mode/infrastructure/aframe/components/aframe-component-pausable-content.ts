import { Entity } from "aframe";
import { Subject } from "rxjs";

export class AFrameComponentPausableContent {

    private componentName = 'pausable-content-component';

    private pausableContentElement!: any;
    private getPausableContentElementSubject: Subject<any> = new Subject();

    constructor() {

        const scope: AFrameComponentPausableContent = this;

        AFRAME.registerComponent(this.componentName, {

            init: function() {
                scope.pausableContentElement = this;
                scope.getPausableContentElementSubject.next(this);
            }

        });

    }

    getPausableContentElement(): Promise<Entity> {
        return new Promise<Entity>((resolve, reject) => {
            if(this.pausableContentElement) {
                resolve(this.pausableContentElement);
            } else {
                this.getPausableContentElementSubject.subscribe((pausableContentElement: any) => {
                    this.pausableContentElement = pausableContentElement.el;
                    resolve(this.pausableContentElement);
                    this.getPausableContentElementSubject.unsubscribe();
                });
            }
        });
    }
}