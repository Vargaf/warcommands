import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCommandComponent } from './game-command.component';
import { MaterialModule } from 'src/app/share/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterByRoleComponent } from '../../class-definition/base/get-workers/filter-by-role/filter-by-role.component';
import { ArrayCountComponent } from './array/array-count/array-count.component';
import { ClassDefinitionModule } from '../../class-definition/class-definition.module';



@NgModule({
    declarations: [
        GameCommandComponent,
        FilterByRoleComponent,
        ArrayCountComponent,
    ],
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
        GameCommandComponent
    ]
})
export class GameCommandModule { }
