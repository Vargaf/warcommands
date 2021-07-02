import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './introduction/introduction.component';



@NgModule({
  declarations: [
    IntroductionComponent,
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
    IntroductionComponent,
  ]
})
export class TutorialModule { }
