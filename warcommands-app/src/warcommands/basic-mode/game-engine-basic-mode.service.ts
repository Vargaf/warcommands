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
import { GameEngineInterface } from '../game-middleware/game-engine.interface';
import { BuildingDTO as BuildingDTOMiddleware } from 'src/warcommands/game-middleware/model/building/building.dto';
import { UnitGenericDTO as UnitGenericDTOMiddleware } from 'src/warcommands/game-middleware/model/unit/unit-generic.dto';
import { GameLogicActionDTO } from '../game-middleware/model/game-logic-actions/game-logic-action.dto';


@Injectable({
    providedIn: 'root'
})
export class BasicModeGameEngineService extends GameEngineInterface  {
    
    private isGameRunning: boolean = true;

    constructor(
        private readonly ngZone: NgZone,
        private readonly statsService: StatsService,
        private readonly requestAnimationFrameService: RequestAnimationFrameService,
        private readonly domElementIjenctorService: DomElementInjectorService,
        private readonly unitsManagerService: UnitsManagerService,
        private readonly buildingsManagerService: BuildingsManagerService
    ) {
        super();
    }

    setViewContainerRef(viewContainerRef: ViewContainerRef): void {
        this.isInitialized = true;
        this.domElementIjenctorService.setViewContainerRef(viewContainerRef);
        this.unitsManagerService.setViewContainerRef(viewContainerRef);
    }

    start() {
        this.animate();
    }

    pauseGame(): void {
        this.isGameRunning = false;
    }

    resumeGame(): void {
        this.isGameRunning = true;
        // We have to run this outside angular zones,
        // because it could trigger heavy changeDetection cycles.
        this.ngZone.runOutsideAngular(() => {
            this.render();
        });
    }

    generateMap(map: MapDTO): void {
        for (const tile of map.tiles) {
            this.domElementIjenctorService.addTile(tile);
        }
    }

    addBuilding(building: BuildingDTOMiddleware): void {
        this.buildingsManagerService.addBuilding(<BuildingDTO>building);
    }

    spawningUnit(unit: UnitGenericDTOMiddleware, spawnFinish: number, spawnStart: number): void {
        this.buildingsManagerService.spawningUnit(<UnitGenericDTO>unit, spawnFinish, spawnStart);
    }

    queueingUnit(unit: UnitGenericDTOMiddleware): void {
        this.buildingsManagerService.queueingUnit(<UnitGenericDTO>unit);
    }

    buildingRemoveUnitFromQueue(unit: UnitGenericDTOMiddleware): void {
        this.buildingsManagerService.removingUnitFromQueue(<UnitGenericDTO>unit);
    }

    unitSpawned(unit: UnitGenericDTOMiddleware): void {
        this.buildingsManagerService.unitSpawned(<UnitGenericDTO>unit);
        this.unitsManagerService.unitSpawned(<UnitGenericDTO>unit);
    }

    unitMoving(unit: UnitGenericDTOMiddleware): void {
        this.unitsManagerService.unitMoving(<UnitGenericDTO>unit);
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

        if (this.isGameRunning) {
            requestAnimationFrame(() => {
                this.render();
            });
    
            this.statsService.update();
            this.requestAnimationFrameService.updateFrameTime();
        }
    }

    gameLogicActionUpdate(action: GameLogicActionDTO): void {
        throw new Error('Method not implemented.');
    }
}
