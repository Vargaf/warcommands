import { Injectable, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { BaseComponent } from 'src/app/basic-mode/graphics/base/base.component';
import { TileGrassComponent } from 'src/app/basic-mode/graphics/tile-grass/tile-grass.component';
import { TileSandComponent } from 'src/app/basic-mode/graphics/tile-sand/tile-sand.component';
import { TileWaterComponent } from 'src/app/basic-mode/graphics/tile-water/tile-water.component';
import { TileDTO } from 'src/warcommands/gameEngine/domain/maps/model/tile.dto';
import { TileType } from 'src/warcommands/gameEngine/domain/maps/model/tile-type.enum';

@Injectable({
    providedIn: 'root'
})
export class DomElementComponentFactoryService {

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    getBaseComponent(): ComponentFactory<BaseComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(BaseComponent);
    }

    getTileComponent(tile: TileDTO): ComponentFactory<TileGrassComponent | TileSandComponent | TileWaterComponent> {

        let component: ComponentFactory<any>;

        switch (tile.type) {
            case TileType.Grass: {
                component = this.componentFactoryResolver.resolveComponentFactory(TileGrassComponent);
                break;
            }
            case TileType.Sand: {
                component = this.componentFactoryResolver.resolveComponentFactory(TileSandComponent);
                break;
            }
            case TileType.Water: {
                component = this.componentFactoryResolver.resolveComponentFactory(TileWaterComponent);
                break;
            }
        }

        return component;
    }
}
