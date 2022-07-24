import {SharedEventBus} from "../../event-bus/shared-event-bus";

const factory = () => {
    return new SharedEventBus();
}

export const provider = {
    provide: SharedEventBus,
    useFactory: factory,
    deps: [],
}
