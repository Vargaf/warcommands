import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './introduction/introduction.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { MaterialModule } from '../share/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import * as TutorialComponentStore from 'src/ngrx/tutorial-component/reducer-map';
import { TutorialComponentProviderModule } from "./tutorial-component-provider.module";
import { TutorialComponentService } from "../../warcommands/tutorial-component/domain/tutorial-component/services/tutorial-component.service";

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
        TutorialComponentProviderModule,
    ],
    providers: [
        { provide: TutorialComponentStore.TUTORIAL_COMPONENT_REDUCER_MAP_TOKEN, useFactory: TutorialComponentStore.reducers },
    ]
})
export class TutorialModule {

    constructor(
        private tutorialComponentService: TutorialComponentService
    ) {
    }
}
