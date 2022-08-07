import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VrModeComponent } from './vr-mode/vr-mode.component';
import { VrModeRoutingModule } from './vr-mode-routing.module';
import { BasicModeOnMemoryModule } from '../share/basic-mode-on-memory/basic-mode-on-memory.module';
import { VrModeProviderModule } from './vr-mode-provider.module';
import { CommandsPanelModule } from '../commands-panel/commands-panel.module';
import { InMmeoryModule } from '../commands-panel/in-mmeory/in-mmeory.module';
import { VrModeAliasProviderModule } from './vr-mode-alias-provider.module';
import { VrModeInMemoryProviderModule } from './vr-mode-in-memory-provider.module';
import { MaterialModule } from '../share/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import * as GameEngineStore from '../../ngrx/basic-mode/reducer-map';
import { StoreModule } from '@ngrx/store';
import { AFrameHolderComponent } from './vr-mode/a-frame-holder/a-frame-holder.component';

// Needed to be able to move the camera with the arrow keys
import 'aframe-extras';

//import 'aframe';
//import 'aframe-event-set-component';
//import 'aframe-layout-component';
//import 'aframe-template-component';


@NgModule( {
    declarations: [ VrModeComponent, AFrameHolderComponent ],
    imports: [
        CommonModule,
        VrModeRoutingModule,
        MaterialModule,
        FlexLayoutModule,
        InMmeoryModule,
        CommandsPanelModule,
        VrModeInMemoryProviderModule,
        VrModeAliasProviderModule,
        VrModeProviderModule,
        BasicModeOnMemoryModule,
        StoreModule.forFeature( GameEngineStore.GameEngineBasicModeStoreKey, GameEngineStore.BASIC_MODE_REDUCER_MAP_TOKEN ),
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA // Tells Angular we will have custom tags in our templates
    ],
    providers: [
        { provide: GameEngineStore.BASIC_MODE_REDUCER_MAP_TOKEN, useFactory: GameEngineStore.reducers },
    ]
} )
export class VrModeModule {
}
