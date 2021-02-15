import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseClassMemberOptionListComponent } from './base/base-class-member-option-list/base-class-member-option-list.component';
import { MaterialModule } from 'src/app/share/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateWorkerComponent } from './base/create-worker/create-worker.component';
import { GetWorkerListComponent } from './base/get-worker-list/get-worker-list.component';
import { GameClassMemberOptionsListComponent } from './game/game-class-member-options-list/game-class-member-options-list.component';
import { GetBaseByIndexComponent } from './game/get-base-by-index/get-base-by-index.component';
import { GetWorkerComponent } from './base/get-worker/get-worker.component';
import { SetRoleComponent } from './worker/set-role/set-role.component';
import { ArrayClassMemberOptionListComponent } from './array/array-class-member-option-list/array-class-member-option-list.component';
import { ArrayCountComponent } from './array/array-count/array-count.component';
import { WorkerClassMemberOptionListComponent } from './worker/worker-class-member-option-list/worker-class-member-option-list.component';



@NgModule({
    declarations: [
        BaseClassMemberOptionListComponent,
        GameClassMemberOptionsListComponent,
        CreateWorkerComponent,
        GetWorkerListComponent,
        GetBaseByIndexComponent,
        GetWorkerComponent,
        SetRoleComponent,
        ArrayClassMemberOptionListComponent,
        ArrayCountComponent,
        WorkerClassMemberOptionListComponent,
        SetRoleComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FlexLayoutModule
    ],
    exports: [
        BaseClassMemberOptionListComponent,
        GameClassMemberOptionsListComponent,
        ArrayClassMemberOptionListComponent,
        WorkerClassMemberOptionListComponent,
    ],
    entryComponents: [
        BaseClassMemberOptionListComponent,
        GameClassMemberOptionsListComponent,
        ArrayClassMemberOptionListComponent,
        WorkerClassMemberOptionListComponent,
    ],
    providers: [
        { provide: parent, useExisting: forwardRef(() => WorkerClassMemberOptionListComponent) }
    ]
})
export class ClassDefinitionModule { }
