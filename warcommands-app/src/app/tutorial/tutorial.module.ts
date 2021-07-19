import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './introduction/introduction.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { MaterialModule } from '../share/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
    declarations: [
        IntroductionComponent,
        TutorialComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
    ],
    entryComponents: [
        TutorialComponent,
    ]
})
export class TutorialModule { }
