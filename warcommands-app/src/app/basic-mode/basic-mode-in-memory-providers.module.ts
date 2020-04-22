import { NgModule } from '@angular/core';
import { InMemoryBuildingsRepositoryService } from 'src/warcommands/basic-mode/infrastructure/in-memory/buildings/in-memory-buildings-repository.service';
import { BuildingsRepositoryService } from 'src/warcommands/basic-mode/domain/building/services/buildings-repository.service';



@NgModule({
  providers: [
    { provide: BuildingsRepositoryService, useClass: InMemoryBuildingsRepositoryService},
  ]
})
export class BasicModeInMemoryProvidersModule { }
