import { Scene } from 'aframe';
import { Subject } from 'rxjs';

export class AframeSceneService {

    private sceneElement!: Scene;
    private _isLoaded = false;
    private isLoadedSubject: Subject<boolean> = new Subject();

    constructor() { }

    setSceneElement(sceneElement: Scene): void {
        this.sceneElement = sceneElement;

        this.sceneElement.addEventListener('loaded', () => {
            this._isLoaded = true;
            this.isLoadedSubject.next(true);
        });
    }

    getSceneElement(): Scene {
        return this.sceneElement;
    }

    isLoaded(): Promise<boolean> {

        const isLoadedPromise: Promise<boolean> = new Promise((resolve, reject) => {
            if(this._isLoaded) {
                resolve(true);
            } else {
                this.isLoadedSubject.subscribe(() => {
                    resolve(true);
                    this.isLoadedSubject.unsubscribe();
                });
            }
        });

        return isLoadedPromise;
    }

}