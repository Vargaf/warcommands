import {NgModule} from "@angular/core";

import * as MapSharedEventBusProvider from 'src/warcommands/shared/infrastructure/angular/provider/map-shared-event-bus.provider';
import {MapSharedEventBus} from "../../warcommands/shared/infrastructure/event-bus/map-shared-event-bus";
import {EventBusInterface} from "../../warcommands/shared/domain/event-bus/event-bus-interface";

@NgModule({
   providers: [
       MapSharedEventBusProvider.provider,
       { provide: 'EventBusInterface', useExisting: MapSharedEventBus },
   ]
})

export class MapSharedEventBusModule {}
