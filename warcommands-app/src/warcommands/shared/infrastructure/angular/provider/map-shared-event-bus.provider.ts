import {MapSharedEventBus} from "../../event-bus/map-shared-event-bus";

const factory = () => {
    return new MapSharedEventBus();
}

export const provider = {
    provide: MapSharedEventBus,
    useFactory: factory,
    deps: [],
}
