import { forwardRef, NgModule } from '@angular/core';
import { GameEngineInterface } from 'src/warcommands/game-middleware/game-engine.interface';
import { BaseBuildingManagerService } from 'src/warcommands/vr-mode/domain/buildings/service/base-building-manager.service';
import { VrModeGameEngineService } from 'src/warcommands/vr-mode/domain/game-engine/vr-mode-game-engine.service';
import { PlayerRepositoryService } from 'src/warcommands/vr-mode/domain/players/services/player-repository.service';
import { BuildingsRepositoryInterface } from 'src/warcommands/vr-mode/domain/buildings/service/buildings-repository.interface';
import { AframeBaseBuildingManagerService } from 'src/warcommands/vr-mode/infrastructure/aframe/buildings/aframe-base-building-manager.service';
import { InMemoryBuildingsRepositoryService } from 'src/warcommands/vr-mode/infrastructure/in-memory/buldings/in-memory-buildings-repository.service';
import { InMemoryPlayerRepositoryService } from 'src/warcommands/vr-mode/infrastructure/in-memory/player/in-memory-player-repository.service';
import { MatterFarmBuildingManagerService } from 'src/warcommands/vr-mode/domain/buildings/service/matter-farm-building-manager.service';
import { AframeMatterFarmBuildingManagerService } from 'src/warcommands/vr-mode/infrastructure/aframe/buildings/aframe-matter-farm-building-manager.service';
import { EnergyFarmBuildingManagerService } from 'src/warcommands/vr-mode/domain/buildings/service/energy-farm-building-manager.service';
import { AframeEnergyFarmBuildingManagerService } from 'src/warcommands/vr-mode/infrastructure/aframe/buildings/aframe-energy-farm-building-manager.service';
import { BuildingsRepositoryService } from 'src/warcommands/basic-mode/domain/building/services/buildings-repository.service';


@NgModule({
    providers: [
        { provide: GameEngineInterface, useExisting: forwardRef(() => VrModeGameEngineService) },
        { provide: BaseBuildingManagerService, useExisting: forwardRef(() => AframeBaseBuildingManagerService) },
        { provide: MatterFarmBuildingManagerService, useExisting: forwardRef(() => AframeMatterFarmBuildingManagerService) },
        { provide: EnergyFarmBuildingManagerService, useExisting: forwardRef(() => AframeEnergyFarmBuildingManagerService) },
        { provide: PlayerRepositoryService, useExisting: forwardRef(() => InMemoryPlayerRepositoryService) },
        { provide: BuildingsRepositoryInterface, useExisting: forwardRef(() => InMemoryBuildingsRepositoryService) },
        { provide: BuildingsRepositoryService, useExisting: forwardRef(() => InMemoryBuildingsRepositoryService) },
    ]
})
export class VrModeAliasProviderModule { }
