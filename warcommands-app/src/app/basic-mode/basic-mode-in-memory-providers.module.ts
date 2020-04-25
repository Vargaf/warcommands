import { NgModule } from '@angular/core';
import { InMemoryBuildingsRepositoryService } from 'src/warcommands/basic-mode/infrastructure/in-memory/buildings/in-memory-buildings-repository.service';
import { BuildingsRepositoryService } from 'src/warcommands/basic-mode/domain/building/services/buildings-repository.service';
import { InMemoryUnitRepositoryService } from 'src/warcommands/basic-mode/infrastructure/in-memory/units/in-memoy-unit-repository.service';
import { UnitRepositoryService } from 'src/warcommands/basic-mode/domain/units/services/unit-repository.service';



@NgModule({
  providers: [
    { provide: BuildingsRepositoryService, useClass: InMemoryBuildingsRepositoryService},
    { provide: UnitRepositoryService, useClass: InMemoryUnitRepositoryService },
  ]
})
export class BasicModeInMemoryProvidersModule { }
