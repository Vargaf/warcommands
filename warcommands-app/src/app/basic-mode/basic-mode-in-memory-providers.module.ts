import { NgModule } from '@angular/core';
import { InMemoryBuildingsRepositoryService } from 'src/warcommands/basic-mode/infrastructure/in-memory/buildings/in-memory-buildings-repository.service';
import { BuildingsRepositoryService } from 'src/warcommands/basic-mode/domain/building/services/buildings-repository.service';
import { InMemoryUnitRepositoryService } from 'src/warcommands/basic-mode/infrastructure/in-memory/units/in-memoy-unit-repository.service';
import { UnitRepositoryService } from 'src/warcommands/basic-mode/domain/units/services/unit-repository.service';
import { GameEngineInterface } from 'src/warcommands/game-middleware/game-engine.interface';
import { BasicModeGameEngineService } from 'src/warcommands/basic-mode/game-engine-basic-mode.service';



@NgModule({
  providers: [
    { provide: BuildingsRepositoryService, useClass: InMemoryBuildingsRepositoryService},
    { provide: UnitRepositoryService, useClass: InMemoryUnitRepositoryService },
    { provide: GameEngineInterface,  useClass: BasicModeGameEngineService }
  ]
})
export class BasicModeInMemoryProvidersModule { }
