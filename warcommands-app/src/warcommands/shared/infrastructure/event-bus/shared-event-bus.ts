import {Observable, Subject} from "rxjs";
import {EventInterface} from "../../domain/event-bus/event.interface";
import {filter} from "rxjs/operators";
import {EventBusInterface} from "../../domain/event-bus/event-bus-interface";

export class SharedEventBus implements EventBusInterface {

    private eventBus: Subject<EventInterface>;

    private separator: string = ':';

    constructor() {
        this.eventBus = new Subject<EventInterface>();
    }

    cast(event: EventInterface): void {

        this.eventBus.next(event);
    }

    on(key: string): Observable<EventInterface> {

        return this.eventBus.asObservable().pipe(
            filter((event) => {
                return this.keyMatch(event.type, key);
            })
        );
    }

    unregister(event: EventInterface): void {
    }

    private keyMatch(eventKey:string, wildcard: string): boolean {

        const allSegmentWildcard = '**';
        const simpleSegmentWildcard = '*';

        const partMatch = (wildcardSegment: string, keySegment: string) => {
            return (wildcardSegment === simpleSegmentWildcard) || (wildcardSegment === keySegment);
        };

        const eventKeySegments = eventKey.split(this.separator);
        const wildcardSegments = wildcard.split(this.separator);

        const eventKeySegmentsLength = eventKeySegments.length;
        const wildcardSegmentsLength = wildcardSegments.length;
        const max = Math.max(eventKeySegmentsLength, wildcardSegmentsLength);

        for (let i = 0; i < max; i++) {
            const segmentEventKey = eventKeySegments[i];
            const segmentWildcard = wildcardSegments[i];

            if (segmentWildcard === allSegmentWildcard && (segmentEventKey !== undefined)) {
                return true;
            }

            if (!partMatch(segmentWildcard, segmentEventKey)) {
                return false;
            }
        }

        return true;
    }

}
