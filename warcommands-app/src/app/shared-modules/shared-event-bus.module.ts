import {NgModule} from "@angular/core";

import * as SharedEventBusProvider from 'src/warcommands/shared/infrastructure/angular/provider/shared-event-bus.provider';

@NgModule({
   providers: [
       SharedEventBusProvider.provider
   ]
})

export class SharedEventBusModule {}
