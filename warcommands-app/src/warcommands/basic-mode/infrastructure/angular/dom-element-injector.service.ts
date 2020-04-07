import { Injectable, ViewContainerRef } from '@angular/core';
import { DomElementComponentFactoryService } from './dom-element-component-factory.service';
import { BaseBuildingDTO } from 'src/warcommands/gameEngine/domain/building/base/base-building.dto';
import { TileDTO } from 'src/warcommands/gameEngine/domain/maps/model/tile.dto';

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

    addBase(base: BaseBuildingDTO): void {
        const componentBase = this.domElementComponentFactoryService.getBaseComponent();
        const componentRef = this.viewContainerRef.createComponent(componentBase);
        componentRef.instance.data = base;
    }

    addTile(tile: TileDTO): void {
        const tileComponent = this.domElementComponentFactoryService.getTileComponent(tile);
        const componentRef = this.viewContainerRef.createComponent(tileComponent);
        componentRef.instance.data = tile;
    }

}
