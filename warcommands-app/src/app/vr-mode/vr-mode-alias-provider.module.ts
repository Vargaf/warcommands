import { forwardRef, NgModule } from '@angular/core';
import { GameEngineInterface } from 'src/warcommands/game-middleware/game-engine.interface';
import { BaseBuildingManagerService } from 'src/warcommands/vr-mode/domain/buildings/service/base-building-manager.service';
import { VrModeGameEngineService } from 'src/warcommands/vr-mode/domain/game-engine/vr-mode-game-engine.service';
import { PlayerRepositoryService } from 'src/warcommands/vr-mode/domain/players/services/player-repository.service';
import { BuildingsRepositoryInterface } from 'src/warcommands/vr-mode/domain/buildings/service/buildings-repository.interface';
import { AframeBaseBuildingManagerService } from 'src/warcommands/vr-mode/infrastructure/aframe/buildings/aframe-base-building-manager.service';
import { InMemoryBuildingsRepositoryService } from 'src/warcommands/vr-mode/infrastructure/in-memory/buldings/in-memory-buildings-repository.service';
import { InMemoryPlayerRepositoryService } from 'src/warcommands/vr-mode/infrastructure/in-memory/player/in-memory-player-repository.service';


@NgModule({
    providers: [
        { provide: GameEngineInterface, useExisting: forwardRef(() => VrModeGameEngineService) },
        { provide: BaseBuildingManagerService, useExisting: forwardRef(() => AframeBaseBuildingManagerService) },
        { provide: PlayerRepositoryService, useExisting: forwardRef(() => InMemoryPlayerRepositoryService) },
        { provide: BuildingsRepositoryInterface, useExisting: forwardRef(() => InMemoryBuildingsRepositoryService) },
    ]
})
export class VrModeAliasProviderModule { }
