import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './introduction/introduction.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { MaterialModule } from '../share/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import * as TutorialComponentStore from 'src/ngrx/tutorial-component/reducer-map';
import { TutorialComponentProviderModule } from "./tutorial-component-provider.module";
import {LocalStorageProviderModule} from "./local-storage-provider.module";
import {LocalStorageAliasModule} from "./local-storage-alias.module";
import { TutorialListenersModule } from "./tutorial-listeners.module";
import { WelcomeComponent } from './welcome/welcome.component';
import { FirstWorkerComponent } from './first-worker/first-worker.component';

@NgModule({
    declarations: [
        IntroductionComponent,
        TutorialComponent,
        WelcomeComponent,
        FirstWorkerComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        StoreModule.forFeature(TutorialComponentStore.TutorialComponentStoreKey, TutorialComponentStore.TUTORIAL_COMPONENT_REDUCER_MAP_TOKEN),
        TutorialComponentProviderModule,
        LocalStorageProviderModule,
        LocalStorageAliasModule,
        TutorialListenersModule,
    ],
    providers: [
        { provide: TutorialComponentStore.TUTORIAL_COMPONENT_REDUCER_MAP_TOKEN, useFactory: TutorialComponentStore.reducers },
    ]
})
export class TutorialModule {}
