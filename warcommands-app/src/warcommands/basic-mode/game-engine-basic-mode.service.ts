import { ViewContainerRef, Injectable, NgZone } from '@angular/core';
import { StatsService } from './infrastructure/stats.service';
import { RequestAnimationFrameService } from './domain/request-animation-frame/request-animation-frame.service';
import { DomElementInjectorService } from './infrastructure/angular/dom-element-injector.service';
import { MapDTO } from '../gameEngine/domain/maps/model/map.dto';
import { UnitGenericDTO } from './domain/units/model/unit-generic.dto';
import { UnitsManagerService } from './domain/units/services/units-manager.service';
import { BuildingsManagerService } from './domain/building/services/buildings-manager.service';
import { BuildingDTO } from './domain/building/model/building.dto';
import { ResourcesDTO } from './domain/share/model/resources.dto';


@Injectable({
    providedIn: 'root'
})
export class BasicModeGameEngineService  {

    constructor(
        private readonly ngZone: NgZone,
        private readonly statsService: StatsService,
        private readonly requestAnimationFrameService: RequestAnimationFrameService,
        private readonly domElementIjenctorService: DomElementInjectorService,
        private readonly unitsManagerService: UnitsManagerService,
        private readonly buildingsManagerService: BuildingsManagerService
    ) {}

    setViewContainerRef(viewContainerRef: ViewContainerRef): void {
        this.domElementIjenctorService.setViewContainerRef(viewContainerRef);
        this.unitsManagerService.setViewContainerRef(viewContainerRef);
    }

    initialize(): void {
        
    }

    start() {
        this.animate();
    }

    generateMap(map: MapDTO): void {
        for (const tile of map.tiles) {
            this.domElementIjenctorService.addTile(tile);
        }
    }

    addBuilding(building: BuildingDTO): void {
        this.buildingsManagerService.addBuilding(building);
    }

    spawningUnit(unit: UnitGenericDTO, spawnFinish: number, spawnStart: number): void {
        this.buildingsManagerService.spawningUnit(unit, spawnFinish, spawnStart);
    }

    queueingUnit(unit: UnitGenericDTO): void {
        this.buildingsManagerService.queueingUnit(unit);
    }

    buildingRemoveUnitFromQueue(unit: UnitGenericDTO): void {
        this.buildingsManagerService.removingUnitFromQueue(unit);
    }

    unitSpawned(unit: UnitGenericDTO): void {
        this.buildingsManagerService.unitSpawned(unit);
        this.unitsManagerService.unitSpawned(unit);
    }

    unitMoving(unit: UnitGenericDTO): void {
        this.unitsManagerService.unitMoving(unit);
    }

    updateBaseResources(baseId: string, resources: ResourcesDTO): void {
        this.buildingsManagerService.updateBaseResources(baseId, resources);
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

        this.statsService.update();
        this.requestAnimationFrameService.updateFrameTime();
    }


}
