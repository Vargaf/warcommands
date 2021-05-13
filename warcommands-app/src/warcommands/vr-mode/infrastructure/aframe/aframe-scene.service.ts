import { Scene } from 'aframe';
import { Subject } from 'rxjs';
import { AFrameStatsService } from './a-frame-stats.service';
import { AFramePausableContentService } from './game-engine/aframe-pausable-content.service';

export class AframeSceneService {

    private sceneElement!: Scene;
    private _isLoaded = false;
    private isLoadedSubject: Subject<boolean> = new Subject();
    private _isInitialized = false;
    private isInitializedSubject: Subject<boolean> = new Subject();
    
    constructor(
        private readonly aframeStatsService: AFrameStatsService,
        private readonly pausableContentService: AFramePausableContentService,

    ) {
        this.aframeStatsService.panelVisibilityListener().subscribe((showPanel: Boolean) => {
            if(this.sceneElement) {
                if(showPanel) {
                    this.sceneElement.setAttribute('stats', true);
                } else {
                    this.sceneElement.removeAttribute('stats');
                }
            }
        });
    }

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

        if (this._isLoaded) {
            return Promise.resolve(true);
        }

        return new Promise((resolve, reject) => {
            this.isLoadedSubject.subscribe(() => {
                resolve(true);
                this.isLoadedSubject.unsubscribe();
            });
        });
    }

    isInitialized(): Promise<boolean> {
        if(this._isInitialized) {
            return Promise.resolve(true);
        }
        
        return new Promise((resolve, reject) => {
            this.isInitializedSubject.subscribe(() => {
                resolve(true);
                this.isInitializedSubject.unsubscribe();
            });
        });
    }

    setGameHasBeenInitialized(): void {
        this.isInitializedSubject.next(true);
    }


    pause(): void {
        this.pausableContentService.pause();
    }

    resume(): void {
        this.pausableContentService.resume();
    }

}