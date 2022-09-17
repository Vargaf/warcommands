import {EventInterface} from "../../../../shared/domain/event-bus/event.interface";
import {TutorialEventTypes} from "./tutorial-event-types.enum";

export class TutorialUserFirstTimeArrivedEvent implements EventInterface {
    readonly data = {};
    readonly type = TutorialEventTypes.TutorialUserFirstTimeArrived;

    constructor() {
    }
}
