import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OverlayModule } from '@angular/cdk/overlay';
import {MatStepperModule} from "@angular/material/stepper";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";

@NgModule({
    exports: [
        MatSidenavModule,
        MatIconModule,
        DragDropModule,
        MatTabsModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        OverlayModule,
        MatStepperModule,
    ],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false }
        }
    ]
})
export class MaterialModule { }
