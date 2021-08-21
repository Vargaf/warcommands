import { NgModule } from "@angular/core";
import { NgrxProviderAliasModule } from "./ngrx-provider-alias.module";
import { NgrxProviderModule } from "./ngrx-provider.module";
import * as TutorialOverlayProvider from "src/warcommands/tutorial-component/infrastructure/angular/factory-providers/tutorial-component/tutorial-overlay.provider";
import * as TutorialComponentProvider from "src/warcommands/tutorial-component/infrastructure/angular/factory-providers/tutorial-component/tutorial-component.provider";

@NgModule({
    imports: [
        NgrxProviderModule,
        NgrxProviderAliasModule,
    ],
    providers: [
        TutorialOverlayProvider.provider,
        TutorialComponentProvider.provider,
    ]
})
export class TutorialComponentProviderModule {

}
