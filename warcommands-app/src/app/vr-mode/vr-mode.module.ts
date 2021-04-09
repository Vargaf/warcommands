import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VrModeComponent } from './vr-mode/vr-mode.component';
import { VrModeRoutingModule } from './vr-mode-routing.module';
import { BasicModeOnMemoryModule } from '../share/basic-mode-on-memory/basic-mode-on-memory.module';
import { VrModeProviderModule } from './vr-mode-provider.module';
import { CommandsPanelModule } from '../commands-panel/commands-panel.module';
import { InMmeoryModule } from '../commands-panel/in-mmeory/in-mmeory.module';
import { VrModeAliasProviderModule } from './vr-mode-alias-provider.module';


//import 'aframe';
//import 'aframe-event-set-component';
//import 'aframe-layout-component';
//import 'aframe-template-component';
import 'aframe-extras';
import { VrModeInMemoryProviderModule } from './vr-mode-in-memory-provider.module';

@NgModule({
  declarations: [VrModeComponent],
  imports: [
    CommonModule,
    VrModeRoutingModule,
    InMmeoryModule,
    CommandsPanelModule,
    VrModeInMemoryProviderModule,
    VrModeAliasProviderModule,
    VrModeProviderModule,
    BasicModeOnMemoryModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA // Tells Angular we will have custom tags in our templates
  ]
})
export class VrModeModule { }
