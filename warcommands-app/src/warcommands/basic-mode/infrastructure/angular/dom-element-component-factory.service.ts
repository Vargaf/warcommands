import { Injectable, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { BaseComponent } from 'src/app/basic-mode/graphics/base/base.component';
import { TileInterface } from 'src/warcommands/gameEngine/interfaces/model/map/tile.interface';
import { TileGrassComponent } from 'src/app/basic-mode/graphics/tile-grass/tile-grass.component';
import { TileSandComponent } from 'src/app/basic-mode/graphics/tile-sand/tile-sand.component';
import { TileWaterComponent } from 'src/app/basic-mode/graphics/tile-water/tile-water.component';
import { TileTypeEnum } from 'src/warcommands/gameEngine/interfaces/model/map/tileType.enum';

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

    getTileComponent(tile: TileInterface): ComponentFactory<TileGrassComponent | TileSandComponent | TileWaterComponent> {

        let component: ComponentFactory<any>;

        switch (tile.type) {
            case TileTypeEnum.Grass: {
                component = this.componentFactoryResolver.resolveComponentFactory(TileGrassComponent);
                break;
            }
            case TileTypeEnum.Sand: {
                component = this.componentFactoryResolver.resolveComponentFactory(TileSandComponent);
                break;
            }
            case TileTypeEnum.Water: {
                component = this.componentFactoryResolver.resolveComponentFactory(TileWaterComponent);
                break;
            }
        }

        return component;
    }
}
