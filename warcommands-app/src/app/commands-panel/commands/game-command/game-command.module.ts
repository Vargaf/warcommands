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
import { GetWorkersComponent } from './get-base-by-index/get-workers/get-workers.component';
import { FilterByRoleComponent } from './get-base-by-index/get-workers/filter-by-role/filter-by-role.component';
import { ArrayCountComponent } from './array/array-count/array-count.component';
import { GameClassMemberOptionsListComponent } from './game-class-member-options-list/game-class-member-options-list.component';



@NgModule({
  declarations: [
    GameCommandComponent,
    GetBaseByIndexComponent,
    GetWorkerComponent,
    SetRoleComponent,
    CreateWorkerComponent,
    GetWorkersComponent,
    FilterByRoleComponent,
    ArrayCountComponent,
    GameClassMemberOptionsListComponent],
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
    GameCommandComponent,
    GameClassMemberOptionsListComponent
  ]
})
export class GameCommandModule { }
