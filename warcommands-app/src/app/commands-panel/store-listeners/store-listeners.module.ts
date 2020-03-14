import { NgModule } from '@angular/core';
import { CommandPanelEventListenerAgregatorService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command-panel/command-panel-event-listener-agregator.service';



@NgModule({
  providers: [
    CommandPanelEventListenerAgregatorService
  ]
})
export class StoreListenersModule {

  constructor(
    private readonly commandPanelEventListenerAgregatorService: CommandPanelEventListenerAgregatorService
  ) {}

}
