import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseClassMemberOptionListComponent } from './base/base-class-member-option-list/base-class-member-option-list.component';
import { MaterialModule } from 'src/app/share/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateWorkerComponent } from './base/create-worker/create-worker.component';
import { GetWorkersComponent } from './base/get-workers/get-workers.component';
import { GameClassMemberOptionsListComponent } from './game/game-class-member-options-list/game-class-member-options-list.component';
import { GetBaseByIndexComponent } from './game/get-base-by-index/get-base-by-index.component';
import { GetWorkerComponent } from './base/get-worker/get-worker.component';
import { SetRoleComponent } from './base/get-worker/set-role/set-role.component';



@NgModule({
    declarations: [
        BaseClassMemberOptionListComponent,
        GameClassMemberOptionsListComponent,
        CreateWorkerComponent,
        GetWorkersComponent,
        GetBaseByIndexComponent,
        GetWorkerComponent,
        SetRoleComponent
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
    ],
    entryComponents: [
        BaseClassMemberOptionListComponent,
        GameClassMemberOptionsListComponent
    ]
})
export class ClassDefinitionModule { }
