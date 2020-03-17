import { GameEngineService } from '../gameEngine/interfaces/game-engine.service';
import { ComponentFactoryResolver, ViewContainerRef, Injectable, NgZone, ComponentRef } from '@angular/core';
import { MinionComponent } from 'src/app/basic-mode/graphics/minion/minion.component';
import { MinionEntity } from '../gameEngine/domain/minion/model/minion.entity';
import { StatsService } from './infrastructure/stats.service';
import { RequestAnimationFrameService } from './domain/request-animation-frame/request-animation-frame.service';
import { MapInterface } from '../gameEngine/interfaces/model/map/map.interface';
import { BaseInterface } from '../gameEngine/interfaces/model/base/base.interface';
import { BaseStoreService } from './infrastructure/ngrx/base/base-store.service';
import { DomElementInjectorService } from './infrastructure/angular/dom-element-injector.service';


@Injectable({
    providedIn: 'root'
})
export class BasicModeGameEngineService extends GameEngineService {

    private viewContainerRef: ViewContainerRef;

    private lastFrameUpdateTime: number;

    private readonly millisecondsPerFrame = 1000 / 30;

    constructor(
        private ngZone: NgZone,
        private statsService: StatsService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private requestAnimationFrameService: RequestAnimationFrameService,
        private baseStoreService: BaseStoreService,
        private domElementIjenctorService: DomElementInjectorService
    ) {
        super();

        this.lastFrameUpdateTime = 0;
        
    }

    setViewContainerRef(viewContainerRef: ViewContainerRef): void {
        this.viewContainerRef = viewContainerRef;
        this.domElementIjenctorService.setViewContainerRef(viewContainerRef);
    }

    initialize(): void {
        //this.generateMap(map);
        //this.addBase(map.playerBase);
        //this.addBase(map.enemyBase);
        
        /*
        for (let y = 0; y < 1; y++) {
            for (let x = 0; x < 1; x++) {
                const minion: MinionEntity = {
                    xCoordinate: x,
                    yCoordinate: y
                };
                this.addMinion(minion);
            }
        }
        */

    }

    addMinion(minion: MinionEntity): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MinionComponent);
        const viewContainerRef = this.viewContainerRef;
        const componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.data = minion;
    }

    start() {
        this.animate();
    }

    addBase(base: BaseInterface): void {
        this.baseStoreService.addBase(base);
        this.domElementIjenctorService.addBase(base);
    }

    generateMap(map: MapInterface): void {
        for (const tile of map.tiles) {
            this.domElementIjenctorService.addTile(tile);
        }
    }

    private animate(): void {
        // We have to run this outside angular zones,
        // because it could trigger heavy changeDetection cycles.
        this.ngZone.runOutsideAngular(() => {
            window.addEventListener('load', () => {
                this.render();
            });
        });
    }

    private render(): void {

        const frameId = requestAnimationFrame(() => {
            this.render();
        });

        const timeElapsed = (performance || Date ).now();

        if (this.isFrameUpdateNeeded(timeElapsed)) {
            this.lastFrameUpdateTime = timeElapsed;
            this.requestAnimationFrameService.updateFrameId(timeElapsed);
        }

        this.statsService.update();
    }

    private isFrameUpdateNeeded(timeElapsed: number): boolean {
        const timeElapsedSinceLastUpdate = timeElapsed - this.lastFrameUpdateTime;

        return timeElapsedSinceLastUpdate > this.millisecondsPerFrame;
    }
}
