import { Injectable, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { BaseComponent } from 'src/app/basic-mode/graphics/base/base.component';
import { TileGrassComponent } from 'src/app/basic-mode/graphics/tile-grass/tile-grass.component';
import { TileSandComponent } from 'src/app/basic-mode/graphics/tile-sand/tile-sand.component';
import { TileWaterComponent } from 'src/app/basic-mode/graphics/tile-water/tile-water.component';
import { TileDTO } from 'src/warcommands/gameEngine/domain/maps/model/tile.dto';
import { TileType } from 'src/warcommands/gameEngine/domain/maps/model/tile-type.enum';
import { UnitTypeENUM } from '../../domain/units/unit-type.enum';
import { MinionComponent } from 'src/app/basic-mode/graphics/minion/minion.component';
import { BuildingTypeEnum } from '../../domain/building/model/building-type.enum';
import { BuildingDTO } from '../../domain/building/model/building.dto';
import { MatterFarmComponent } from 'src/app/basic-mode/graphics/matter-farm/matter-farm.component';
import { EnergyFarmComponent } from 'src/app/basic-mode/graphics/energy-farm/energy-farm.component';

@Injectable({
    providedIn: 'root'
})
export class DomElementComponentFactoryService {

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    /*
    getBaseComponent(): ComponentFactory<BaseComponent> {
        return this.componentFactoryResolver.resolveComponentFactory(BaseComponent);
    }
    */

    getBuildingComponent(building: BuildingDTO): ComponentFactory<BaseComponent> {
        let component: ComponentFactory<any>;

        switch (building.type) {
            case BuildingTypeEnum.Base: {
                component = this.componentFactoryResolver.resolveComponentFactory(BaseComponent);
                break;
            }
            case BuildingTypeEnum.MatterFarm: {
                component = this.componentFactoryResolver.resolveComponentFactory(MatterFarmComponent);
                break;
            }
            case BuildingTypeEnum.EnergyFarm: {
                component = this.componentFactoryResolver.resolveComponentFactory(EnergyFarmComponent);
                break;
            }
            default: {
                throw new Error('Building component does not exists: ' + building.type);
            }
        }

        return component;
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

    getUnitComponent(unitType: UnitTypeENUM): ComponentFactory<MinionComponent> {

        let component: ComponentFactory<any>;

        switch (unitType) {
            case UnitTypeENUM.Minion: {
                component = this.componentFactoryResolver.resolveComponentFactory(MinionComponent);
                break;
            }
            default: {
                throw new Error("Wrong unit type: " + unitType);
            }
        }

        return component;
    }
}
