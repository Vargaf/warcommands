import {NgModule} from "@angular/core";
import * as LocalStorageGameTutorialRepositoryProvider from "src/warcommands/tutorial-component/infrastructure/angular/factory-providers/tutorial-component/game-tutorial-repository.provider";

@NgModule({
    providers: [
        LocalStorageGameTutorialRepositoryProvider.provider,
    ]
})
export class LocalStorageProviderModule {}
