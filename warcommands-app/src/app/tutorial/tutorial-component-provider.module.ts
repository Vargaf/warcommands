import { NgModule } from "@angular/core";
import { NgrxProviderAliasModule } from "./ngrx-provider-alias.module";
import { NgrxProviderModule } from "./ngrx-provider.module";
import * as GameTutorialProvider from "src/warcommands/tutorial/infrastructure/angular/factory-providers/tutorial-component/game-tutorial.provider";
import * as GameTutorialRepositoryProvider from "src/warcommands/tutorial/infrastructure/angular/factory-providers/tutorial-component/game-tutorial-repository.provider";

@NgModule({
    imports: [
        NgrxProviderModule,
        NgrxProviderAliasModule,
    ],
    providers: [
        GameTutorialProvider.provider,
        GameTutorialRepositoryProvider.provider
    ]
})
export class TutorialComponentProviderModule {

}
