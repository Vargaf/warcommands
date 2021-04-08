import { forwardRef, NgModule } from '@angular/core';
import { GameEngineInterface } from 'src/warcommands/game-middleware/game-engine.interface';
import { BaseBuildingManagerService } from 'src/warcommands/vr-mode/domain/buildings/service/base-building-manager.service';
import { VrModeGameEngineService } from 'src/warcommands/vr-mode/domain/game-engine/vr-mode-game-engine.service';
import { AframeBaseBuildingManagerService } from 'src/warcommands/vr-mode/infrastructure/aframe/buildings/aframe-base-building-manager.service';


@NgModule({
    providers: [
        { provide: GameEngineInterface, useExisting: forwardRef(() => VrModeGameEngineService) },
        { provide: BaseBuildingManagerService, useExisting: forwardRef(() => AframeBaseBuildingManagerService) },
    ]
})
export class VrModeAliasProviderModule { }
