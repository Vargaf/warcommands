import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCommandComponent } from './game-command.component';
import { MaterialModule } from 'src/app/share/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GetBaseByIndexComponent } from './get-base-by-index/get-base-by-index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GetWorkerComponent } from './get-worker/get-worker.component';
import { SetRoleComponent } from './get-worker/set-role/set-role.component';
import { CreateWorkerComponent } from './get-base-by-index/create-worker/create-worker.component';



@NgModule({
  declarations: [
    GameCommandComponent,
    GetBaseByIndexComponent,
    GetWorkerComponent,
    SetRoleComponent,
    CreateWorkerComponent],
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
