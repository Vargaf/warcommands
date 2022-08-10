import {NgModule} from "@angular/core";
import * as LocalStorageGameTutorialRepositoryProvider from "src/warcommands/tutorial/infrastructure/angular/factory-providers/tutorial-component/game-tutorial-repository.provider";

@NgModule({
    providers: [
        LocalStorageGameTutorialRepositoryProvider.provider,
    ]
})
export class LocalStorageProviderModule {}
