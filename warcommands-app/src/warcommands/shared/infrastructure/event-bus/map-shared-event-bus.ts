import {Subject, Subscription} from "rxjs";
import {EventInterface} from "../../domain/event-bus/event.interface";
import {v4 as uuid} from 'uuid';
import {EventBusInterface} from "../../domain/event-bus/event-bus-interface";
import {EventTokenInterface} from "../../domain/event-bus/event-token-interface";

interface MapSubjectEvents {
    segments: Map<string,MapSubjectEvents>;
    subjects: Map<string, SubjectEvent>;
}

interface SubjectEvent {
    subscription: Subscription;
    subject: Subject<EventInterface>;
}

class EventToken implements EventTokenInterface {
    constructor(public token: string) {
    }
}

export class MapSharedEventBus implements EventBusInterface{

    private readonly mapEventBus: MapSubjectEvents;
    private savedTokens: Map<string, string>;
    private readonly wildCard = '*';

    private separator: string = ':';

    constructor() {
        this.mapEventBus = {
            segments: new Map(),
            subjects: new Map()
        };

        this.savedTokens = new Map();
    }

    cast(event: EventInterface): void {

        const eventSegmentPath = event.type.split(this.separator);
        this.walkMapEventBus(eventSegmentPath, this.mapEventBus, event);
    }

    on(key: string, fn:(event: EventInterface) => void): EventTokenInterface {
        const eventSegmentPath = key.split(this.separator);

        const token = this.buildSegmentEventPath(eventSegmentPath, this.mapEventBus, fn);
        this.savedTokens.set(token, key);
        return new EventToken(token);
    }

    unregister(token: EventTokenInterface): void {
        const actualToken: EventToken = token as EventToken;
        const segment = this.savedTokens.get(actualToken.token);
        if(segment) {
            const segmentPath = segment.split(this.separator);
            this.unregisterSegment(actualToken.token, segmentPath, this.mapEventBus);
            this.savedTokens.delete(actualToken.token);
        }
    }

    private unregisterSegment(token: string, segmentPath: Array<string>, mapEventBus: MapSubjectEvents): void {

        if(segmentPath.length === 0) {
            if(mapEventBus.subjects.has(token)) {
                const eventSubscription = mapEventBus.subjects.get(token) as SubjectEvent;
                eventSubscription.subscription.unsubscribe();
                mapEventBus.subjects.delete(token);
            }
        } else {
            const segment = segmentPath.shift() as string;
            const mapEventbusSegment = mapEventBus.segments.get(segment) as MapSubjectEvents;

            this.unregisterSegment(token, segmentPath, mapEventbusSegment);

            if(mapEventbusSegment.segments.size === 0 && mapEventbusSegment.subjects.size === 0) {
                mapEventBus.segments.delete(segment);
            }
        }
    }

    private triggerListeners(mapEventBus: MapSubjectEvents, event: EventInterface): void {
        // If it is the last segment we trigger all the listeners
        mapEventBus.subjects.forEach((subjectEvent) => {
            subjectEvent.subject.next(event);
        });
    }

    private walkMapEventBus(eventSegmentPath: Array<string>, mapEventBus: MapSubjectEvents, event: EventInterface): void {
        // To run the array
        const segmentKey = eventSegmentPath.shift() as string;

        if(mapEventBus.segments.has(segmentKey)) {
            this.walkMapEventBusSegments(segmentKey, eventSegmentPath, mapEventBus, event);
        }

        if(mapEventBus.segments.has(this.wildCard)) {
            this.walkMapEventBusSegments(this.wildCard, eventSegmentPath, mapEventBus, event);
        }

        // To recover the array to the next run
        eventSegmentPath.unshift(segmentKey);
    }

    private walkMapEventBusSegments(segmentKey: string, eventSegmentPath: Array<string>, mapEventBus: MapSubjectEvents, event: EventInterface): void {
        let nexMapEventBus = mapEventBus.segments.get(segmentKey)as MapSubjectEvents;
        if(nexMapEventBus !== undefined) {
            if(eventSegmentPath.length === 0) {
                this.triggerListeners(nexMapEventBus, event);
            } else {
                this.walkMapEventBus(eventSegmentPath, nexMapEventBus, event);
            }
        }
    }

    private buildSegmentEventPath(eventSegmentPath: Array<string>, mapSubjectEvents: MapSubjectEvents, fn:(event: EventInterface) => void): string {
        const segment = eventSegmentPath.shift() as string;
        const mapEventBus = mapSubjectEvents.segments;
        let token!: string;

        if(mapEventBus.has(segment)) {
            if(eventSegmentPath.length !== 0) {
                // We still have more levels to navigate
                const nextMapEventBusLevel = mapEventBus.get(segment) as MapSubjectEvents;
                token = this.buildSegmentEventPath(eventSegmentPath, nextMapEventBusLevel, fn);
            } else {
                // We are on the last level, we should create the subject
                const map: MapSubjectEvents = mapEventBus.get(segment) as MapSubjectEvents;
                const subject = new Subject<EventInterface>();
                const subscription = subject.subscribe((event: EventInterface) => {
                    fn(event);
                });
                const subjectEvent: SubjectEvent = {
                    subject: subject,
                    subscription: subscription
                };
                token = uuid();
                map.subjects.set(token, subjectEvent);
            }
        } else {
            token = this.buildMapSubjectEvent(segment, eventSegmentPath, mapSubjectEvents, fn);
        }

        return token;
    }

    private buildMapSubjectEvent(segment: string, eventSegmentPath: Array<string>, mapSubjectEvents: MapSubjectEvents, fn:(event: EventInterface) => void): string {

        let token!: string;

        if(eventSegmentPath.length !== 0) {
            const mapSubjectEvent: MapSubjectEvents = {
                segments: new Map(),
                subjects: new Map()
            };
            mapSubjectEvents.segments.set(segment, mapSubjectEvent);
            const nextSegment: string = eventSegmentPath.shift() as string;
            const nextMapEventBusLevel = mapSubjectEvents.segments.get(segment) as MapSubjectEvents;
            token = this.buildMapSubjectEvent(nextSegment, eventSegmentPath, nextMapEventBusLevel, fn);
        } else {
            const subject = new Subject<EventInterface>();
            const subscription = subject.subscribe((event: EventInterface) => {
                fn(event);
            });
            const subjectEvent: SubjectEvent = {
                subject: subject,
                subscription: subscription
            };
            const mapSubject = new Map();

            token = uuid();

            mapSubject.set(token, subjectEvent);
            const mapSubjectEvent: MapSubjectEvents = {
                segments: new Map(),
                subjects: mapSubject
            };

            mapSubjectEvents.segments.set(segment, mapSubjectEvent);
        }

        return token;
    }
}
