import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariablePreviewComponent } from './variable-preview/variable-preview.component';
import { SetVariablePreviewComponent } from './set-variable-preview/set-variable-preview.component';
import { IfThenPreviewComponent } from './if-then-preview/if-then-preview.component';
import { IfThenElsePreviewComponent } from './if-then-else-preview/if-then-else-preview.component';
import { GameCommandPreviewComponent } from './game-command-preview/game-command-preview.component';
import { SetVariableFromCommandPreviewComponent } from './set-variable-from-command-preview/set-variable-from-command-preview.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
    declarations: [
        VariablePreviewComponent,
        SetVariablePreviewComponent,
        IfThenPreviewComponent,
        IfThenElsePreviewComponent,
        GameCommandPreviewComponent,
        SetVariableFromCommandPreviewComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
    ],
    exports: [
        GameCommandPreviewComponent,
        SetVariablePreviewComponent,
        SetVariableFromCommandPreviewComponent,
    ],
    entryComponents: [
        VariablePreviewComponent,
        SetVariablePreviewComponent,
        SetVariableFromCommandPreviewComponent,
        IfThenPreviewComponent,
        IfThenElsePreviewComponent,
        GameCommandPreviewComponent
    ]
})
export class DragPreviewsModule { }
