import { Injectable, ViewContainerRef } from '@angular/core';
import { BaseInterface } from 'src/warcommands/gameEngine/interfaces/model/base/base.interface';
import { TileInterface } from 'src/warcommands/gameEngine/interfaces/model/map/tile.interface';
import { DomElementComponentFactoryService } from './dom-element-component-factory.service';

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

    addBase(base: BaseInterface): void {
        const componentBase = this.domElementComponentFactoryService.getBaseComponent();
        const componentRef = this.viewContainerRef.createComponent(componentBase);
        componentRef.instance.data = base;
    }

    addTile(tile: TileInterface): void {
        const tileComponent = this.domElementComponentFactoryService.getTileComponent(tile);
        const componentRef = this.viewContainerRef.createComponent(tileComponent);
        componentRef.instance.data = tile;
    }

}
