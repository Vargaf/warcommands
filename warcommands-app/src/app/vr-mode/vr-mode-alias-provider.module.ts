import { forwardRef, NgModule } from '@angular/core';
import { GameEngineInterface } from 'src/warcommands/game-middleware/game-engine.interface';
import { VrModeGameEngineService } from 'src/warcommands/vr-mode/domain/game-engine/vr-mode-game-engine.service';


@NgModule({
    providers: [
        { provide: GameEngineInterface, useExisting: forwardRef(() => VrModeGameEngineService) }
    ]
})
export class VrModeAliasProviderModule { }
