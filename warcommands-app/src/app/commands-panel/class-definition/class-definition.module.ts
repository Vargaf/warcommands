import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseClassMemberOptionListComponent } from './base/base-class-member-option-list/base-class-member-option-list.component';
import { MaterialModule } from 'src/app/share/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateWorkerComponent } from './base/create-worker/create-worker.component';
import { GetWorkersComponent } from './base/get-workers/get-workers.component';



@NgModule({
  declarations: [
    BaseClassMemberOptionListComponent,
    CreateWorkerComponent,
    GetWorkersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [
    BaseClassMemberOptionListComponent
  ],
  entryComponents: [
    BaseClassMemberOptionListComponent
  ]
})
export class ClassDefinitionModule { }
