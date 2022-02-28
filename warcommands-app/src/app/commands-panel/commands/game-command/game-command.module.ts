import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCommandComponent } from './game-command.component';
import { MaterialModule } from 'src/app/share/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassDefinitionModule } from '../../class-definition/class-definition.module';



@NgModule({
    declarations: [
        GameCommandComponent
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
    ]
})
export class GameCommandModule { }
