import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMinionPreviewComponent } from './create-minion-preview/create-minion-preview.component';
import { VariablePreviewComponent } from './variable-preview/variable-preview.component';
import { SetVariablePreviewComponent } from './set-variable-preview/set-variable-preview.component';
import { IfThenPreviewComponent } from './if-then-preview/if-then-preview.component';
import { IfThenElsePreviewComponent } from './if-then-else-preview/if-then-else-preview.component';



@NgModule({
    declarations: [
        CreateMinionPreviewComponent,
        VariablePreviewComponent,
        SetVariablePreviewComponent,
        IfThenPreviewComponent,
        IfThenElsePreviewComponent
    ],
    imports: [
        CommonModule
    ],
    entryComponents: [
        CreateMinionPreviewComponent,
        VariablePreviewComponent,
        SetVariablePreviewComponent,
        IfThenPreviewComponent,
        IfThenElsePreviewComponent
    ]
})
export class DragPreviewsModule { }
