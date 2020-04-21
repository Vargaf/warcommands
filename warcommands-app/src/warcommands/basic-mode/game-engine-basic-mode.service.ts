import { ViewContainerRef, Injectable, NgZone } from '@angular/core';
import { StatsService } from './infrastructure/stats.service';
import { RequestAnimationFrameService } from './domain/request-animation-frame/request-animation-frame.service';
import { DomElementInjectorService } from './infrastructure/angular/dom-element-injector.service';
import { MapDTO } from '../gameEngine/domain/maps/model/map.dto';
import { UnitGenericDTO } from './domain/units/unit-generic.dto';
import { UnitSpawningManagerService } from './domain/units/services/unit-spawning-manager.service';
import { BuildingsManagerService } from './domain/building/services/buildings-manager.service';
import { BuildingDTO } from './domain/building/model/building.dto';


@Injectable({
    providedIn: 'root'
})
export class BasicModeGameEngineService  {

    private viewContainerRef: ViewContainerRef;

    private lastFrameUpdateTime: number;

    private readonly millisecondsPerFrame = 1000 / 30;

    constructor(
        private readonly ngZone: NgZone,
        private readonly statsService: StatsService,
        private readonly requestAnimationFrameService: RequestAnimationFrameService,
        private readonly domElementIjenctorService: DomElementInjectorService,
        private readonly unitSpawnngManagerService: UnitSpawningManagerService,
        private readonly buildingsManagerService: BuildingsManagerService
    ) {
        this.lastFrameUpdateTime = 0;
    }

    setViewContainerRef(viewContainerRef: ViewContainerRef): void {
        this.viewContainerRef = viewContainerRef;
        this.domElementIjenctorService.setViewContainerRef(viewContainerRef);
        this.unitSpawnngManagerService.setViewContainerRef(viewContainerRef);
    }

    initialize(): void {
        
    }

    start() {
        this.animate();
    }

    addBuilding(building: BuildingDTO): void {
        this.buildingsManagerService.addBuilding(building);
    }

    generateMap(map: MapDTO): void {
        for (const tile of map.tiles) {
            this.domElementIjenctorService.addTile(tile);
        }
    }

    spawningUnit(unit: UnitGenericDTO, spawnTime: number): void {
        this.unitSpawnngManagerService.spawningUnit(unit, spawnTime);
    }

    unitSpawned(unit: UnitGenericDTO): void {
        this.unitSpawnngManagerService.unitSpawned(unit);
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
