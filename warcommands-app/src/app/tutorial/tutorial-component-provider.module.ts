import { NgModule } from "@angular/core";
import { NgrxProviderAliasModule } from "./ngrx-provider-alias.module";
import { NgrxProviderModule } from "./ngrx-provider.module";
import * as TutorialOverlayProvider from "src/warcommands/tutorial/infrastructure/angular/factory-providers/tutorial-component/tutorial-overlay.provider";
import * as TutorialComponentProvider from "src/warcommands/tutorial/infrastructure/angular/factory-providers/tutorial-component/tutorial-component.provider";
import * as GameTutorialProvider from "src/warcommands/tutorial/infrastructure/angular/factory-providers/tutorial-component/game-tutorial.provider";
import * as GameTutorialRepositoryProvider from "src/warcommands/tutorial/infrastructure/angular/factory-providers/tutorial-component/game-tutorial-repository.provider";

@NgModule({
    imports: [
        NgrxProviderModule,
        NgrxProviderAliasModule,
    ],
    providers: [
        TutorialOverlayProvider.provider,
        TutorialComponentProvider.provider,
        GameTutorialProvider.provider,
        GameTutorialRepositoryProvider.provider
    ]
})
export class TutorialComponentProviderModule {

}
