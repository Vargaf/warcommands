import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCommandComponent } from './game-command.component';
import { MaterialModule } from 'src/app/share/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GetBaseByIndexComponent } from './get-base-by-index/get-base-by-index.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [GameCommandComponent, GetBaseByIndexComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  exports: [
    GameCommandComponent
  ],
  entryComponents: [
    GameCommandComponent
  ]
})
export class GameCommandModule { }
