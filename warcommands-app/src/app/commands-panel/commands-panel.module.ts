import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommandsPanelComponent } from './commands-panel.component';
import { GameLoopComponent } from './game-loop/game-loop.component';
import { MaterialModule } from '../share/material/material.module';
import { CreateMinionComponent } from './create-minion/create-minion.component';
import { CommandDirective } from './command.directive';



@NgModule({
  declarations: [
    CommandsPanelComponent,
    GameLoopComponent,
    CommandDirective,
    CreateMinionComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    CommandsPanelComponent
  ],
  entryComponents: [
    CreateMinionComponent,
  ]
})
export class CommandsPanelModule { }
