import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EventInterface } from '../model/event.interface';
import { GameStartedEvent } from '../model/game-started.event';


export class GameEventBusService {

    private eventBus: Subject<EventInterface>;

    private separator: ';';

    constructor() {
        const gameStartedEvnt = new GameStartedEvent();
        this.eventBus = new Subject<EventInterface>();
    }

    private keyMatch(eventKey:string, wildcard: string): boolean {
        
        const simpleSegmentWildcard = '*';
        const allSegmentWildcard = '**';

        const partMatch = (wildcardSegment: string, keySegment: string) => {
            return (wildcardSegment === simpleSegmentWildcard) || (wildcardSegment === keySegment);
        };

        const sep = this.separator;
        const eventKeySegments = eventKey.split(sep);
        const wildcardSegments = wildcard.split(sep);

        const eventKeySegmentsLenght = eventKeySegments.length;
        const wildcardSegmentsLenght = wildcardSegments.length;
        const max = Math.max(eventKeySegmentsLenght, wildcardSegmentsLenght);

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

    public cast(event: EventInterface): void {

        this.eventBus.next(event);
    }

    public on(key: string): Observable<EventInterface> {

        return this.eventBus.asObservable().pipe(
            filter((event) => {
                return this.keyMatch(event.type, key);
            })
        );
    }

}