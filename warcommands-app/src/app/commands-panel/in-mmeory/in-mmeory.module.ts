import { NgModule } from '@angular/core';
import { CommandRepositoryService } from 'src/warcommands/commands-panel/domain/command/services/command-repository.service';
import { InMemoryCommandRepositoryService } from 'src/warcommands/commands-panel/infrastructure/in-memory/command/in-memory-command-repository.service';
import { CommandContainerRepositoryService } from 'src/warcommands/commands-panel/domain/command-container/services/command-container-repository.service';
import { InMemoryCommandContainerRepositoryService } from 'src/warcommands/commands-panel/infrastructure/in-memory/command-container/in-memory-command-container-repository.service';
import { CurrentPlayerRepositoryService } from 'src/warcommands/commands-panel/domain/current-player/services/current-player-repository.service';
import { InMemoryCurrentPlayerRepositoryService } from 'src/warcommands/commands-panel/infrastructure/in-memory/current-player/in-memory-current-player-repository.service';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: CommandRepositoryService, useClass: InMemoryCommandRepositoryService },
    { provide: CommandContainerRepositoryService, useClass: InMemoryCommandContainerRepositoryService },
    { provide: CurrentPlayerRepositoryService, useClass: InMemoryCurrentPlayerRepositoryService },
  ]
})
export class InMmeoryModule { }
