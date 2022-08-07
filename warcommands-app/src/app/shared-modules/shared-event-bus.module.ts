import { NgModule} from "@angular/core";

import * as SharedEventBusProvider from 'src/warcommands/shared/infrastructure/angular/provider/shared-event-bus.provider';
import {EventBusInterface} from "../../warcommands/shared/domain/event-bus/event-bus-interface";
import {SharedEventBus} from "../../warcommands/shared/infrastructure/event-bus/shared-event-bus";

@NgModule({
   providers: [
       SharedEventBusProvider.provider,
       { provide: 'EventBusInterface', useExisting: SharedEventBus },
   ]
})

export class SharedEventBusModule {}
