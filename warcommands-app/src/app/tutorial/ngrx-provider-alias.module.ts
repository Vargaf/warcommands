import { NgModule, forwardRef } from "@angular/core";
import { NgrxTutorialComponentToggleService } from "src/warcommands/tutorial-component/infrastructure/ngrx/turotial-component/ngrx-tutorial-component-toggle.service";
import { TutorialComponentToggleServiceInterface } from "src/warcommands/tutorial-component/domain/tutorial-component/services/tutorial-component-toggle-service.interface";

@NgModule({
    providers: [
        { provide: TutorialComponentToggleServiceInterface, useExisting: forwardRef(() => NgrxTutorialComponentToggleService) }
    ]
})
export class NgrxProviderAliasModule {}
