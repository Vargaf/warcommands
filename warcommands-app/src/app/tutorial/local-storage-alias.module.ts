import { forwardRef, NgModule } from "@angular/core";
import { LocalStorageGameTutorialRepository } from "../../warcommands/tutorial/infrastructure/local-storage/local-storage-game-tutorial-repository";
import { GameTutorialRepository } from "src/warcommands/tutorial/domain/tutorial/services/game-tutorial-repository.interface";
@NgModule({
    providers: [
        { provide: 'GameTutorialRepository', useExisting: forwardRef(() => LocalStorageGameTutorialRepository) }
    ]
})
export class LocalStorageAliasModule {}
