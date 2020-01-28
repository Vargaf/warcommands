import { GameEngineService } from '../gameEngine/interfaces/game-engine.service';
import { ComponentFactoryResolver, ViewContainerRef, Injectable, NgZone } from '@angular/core';
import { MapGeneratorService } from '../gameEngine/domain/maps/services/map-generator.service';
import { TileComponent } from 'src/app/basic-mode/graphics/tile/tile.component';
import { MinionComponent } from 'src/app/basic-mode/graphics/minion/minion.component';
import { MinionEntity } from '../gameEngine/domain/minion/model/minion.entity';


@Injectable({
    providedIn: 'root'
})
export class BasicModeGameEngineService extends GameEngineService {

    private viewContainerRef: ViewContainerRef;

    constructor(
        private ngZone: NgZone,
        private componentFactoryResolver: ComponentFactoryResolver,
        private mapGenerator: MapGeneratorService
    ) {
        super();
    }

    setViewContainerRef(viewContainerRef: ViewContainerRef): void {
        this.viewContainerRef = viewContainerRef;
    }

    initialize(): void {
        this.generateMap();

        const minion: MinionEntity = {
            xCoordinate: 0,
            yCoordinate: 0
        };
        this.addMinion(minion);
    }

    addMinion(minion: MinionEntity): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MinionComponent);
        const viewContainerRef = this.viewContainerRef;
        const componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.data = minion;
    }

    start() {
        this.render();
    }

    private generateMap(): void {
        const map = this.mapGenerator.generateBasicMap();

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TileComponent);
        const viewContainerRef = this.viewContainerRef;

        for (const tile of map.tiles) {
            const componentRef = viewContainerRef.createComponent(componentFactory);
            componentRef.instance.data = tile;
        }
    }

    private animate(): void {
        // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
        this.ngZone.runOutsideAngular(() => {
            window.addEventListener('DOMContentLoaded', () => {
                this.render();
            });
        });
    }

    private render(): void {
        requestAnimationFrame(() => {
            this.render();
        });
    }
}
