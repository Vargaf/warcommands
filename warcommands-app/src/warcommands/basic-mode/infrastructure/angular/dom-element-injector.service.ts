import { Injectable, ViewContainerRef } from '@angular/core';
import { DomElementComponentFactoryService } from './dom-element-component-factory.service';
import { TileDTO } from 'src/warcommands/gameEngine/domain/maps/model/tile.dto';
import { BaseEntityInterface } from '../../domain/building/base/base-entity-interface';

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

    addBase(base: BaseEntityInterface): void {
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
