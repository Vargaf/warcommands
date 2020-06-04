import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCommandComponent } from './game-command.component';
import { MaterialModule } from 'src/app/share/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GetBaseByIndexComponent } from './get-base-by-index/get-base-by-index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GetWorkerComponent } from './get-worker/get-worker.component';
import { SetRoleComponent } from './get-worker/set-role/set-role.component';
import { FilterByRoleComponent } from '../../class-definition/base/get-workers/filter-by-role/filter-by-role.component';
import { ArrayCountComponent } from './array/array-count/array-count.component';
import { GameClassMemberOptionsListComponent } from './game-class-member-options-list/game-class-member-options-list.component';
import { ClassDefinitionModule } from '../../class-definition/class-definition.module';



@NgModule({
  declarations: [
    GameCommandComponent,
    GetBaseByIndexComponent,
    GetWorkerComponent,
    SetRoleComponent,
    FilterByRoleComponent,
    ArrayCountComponent,
    GameClassMemberOptionsListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ClassDefinitionModule
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
