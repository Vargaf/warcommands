import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './introduction/introduction.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { MaterialModule } from '../share/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import * as TutorialComponentStore from 'src/ngrx/tutorial-component/reducer-map';



@NgModule({
    declarations: [
        IntroductionComponent,
        TutorialComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        StoreModule.forFeature(TutorialComponentStore.TutorialComponentStoreKey, TutorialComponentStore.TUTORIAL_COMPONENT_REDUCER_MAP_TOKEN),
    ],
    providers: [
        { provide: TutorialComponentStore.TUTORIAL_COMPONENT_REDUCER_MAP_TOKEN, useFactory: TutorialComponentStore.reducers }
    ],
    entryComponents: [
        TutorialComponent,
    ]
})
export class TutorialModule { }
