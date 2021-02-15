import { Injectable, ViewContainerRef } from '@angular/core';
import { DomElementComponentFactoryService } from './dom-element-component-factory.service';
import { TileDTO } from 'src/warcommands/gameEngine/domain/maps/model/tile.dto';
import { BuildingDTO } from '../../domain/building/model/building.dto';

@Injectable({
    providedIn: 'root'
})
export class DomElementInjectorService {

    private viewContainerRef: ViewContainerRef;

    constructor(
        private domElementComponentFactoryService: DomElementComponentFactoryService
    ) {}

    setViewContainerRef(viewContainerRef: ViewContainerRef): void {
        this.viewContainerRef = viewContainerRef;
    }

    addBuilding(building: BuildingDTO): void {
        const buildingComponent = this.domElementComponentFactoryService.getBuildingComponent(building);
        const componentRef = this.viewContainerRef.createComponent(buildingComponent);
        componentRef.instance.data = building;
    }

    addTile(tile: TileDTO): void {
        const tileComponent = this.domElementComponentFactoryService.getTileComponent(tile);
        const componentRef = this.viewContainerRef.createComponent(tileComponent);
        componentRef.instance.data = tile;
    }

}
