import { NgModule } from "@angular/core";

import * as NgrxTutorialComponentRepositoryProvider
    from "src/warcommands/tutorial/infrastructure/angular/factory-providers/tutorial-component/ngrx-tutorial-component-toggle.provider";

@NgModule({
    providers: [
        NgrxTutorialComponentRepositoryProvider.provider
    ]
})
export class NgrxProviderModule {}
