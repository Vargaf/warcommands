import { Renderer2, RendererFactory2 } from '@angular/core';
import { Entity, Scene } from 'aframe';
import { Subject } from 'rxjs';
import { AFrameStatsService } from './a-frame-stats.service';
import { AFramePausableContentService } from './game-engine/aframe-pausable-content.service';

export class AframeSceneService {

    private sceneElement!: Scene;
    private _isLoaded = false;
    private isLoadedSubject: Subject<boolean> = new Subject();
    
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

        const isLoadedPromise: Promise<boolean> = new Promise((resolve, reject) => {
            if (this._isLoaded) {
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

    pause(): void {
        this.pausableContentService.pause();
    }

    resume(): void {
        this.pausableContentService.resume();
    }

}