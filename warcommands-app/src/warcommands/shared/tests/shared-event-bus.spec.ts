import {SharedEventBus} from "../infrastructure/event-bus/shared-event-bus";
import {EventInterface} from "../domain/event-bus/event.interface";

describe('SharedEventBus service', () => {

    function setup() {
        const sharedEventBus = new SharedEventBus();

        return {sharedEventBus};
    }

    it('Simple segment event launch', (done: DoneFn) => {
        const {sharedEventBus} = setup();
        const simpleSegmentEventType = 'simpleSegmentEvent';

        const simpleSegmentEvent: EventInterface = {
            data: {},
            type: simpleSegmentEventType
        };

        sharedEventBus.on(simpleSegmentEventType).subscribe(event => {
            expect(simpleSegmentEventType).toBe(event.type);
            done();
        });

        sharedEventBus.cast(simpleSegmentEvent);
    })

    it('Two same simple segment event launch', (done: DoneFn) => {
        const {sharedEventBus} = setup();
        const simpleSegmentEventType = 'simpleSegmentEvent';

        const simpleSegmentEvent: EventInterface = {
            data: {},
            type: simpleSegmentEventType
        };

        const promiseSpy1 = new Promise((resolve) => {
            sharedEventBus.on(simpleSegmentEventType).subscribe(event => {
                expect(simpleSegmentEventType).toBe(event.type);
                resolve(true);
            });
        });
        const promiseSpy2 = new Promise((resolve) => {
            sharedEventBus.on(simpleSegmentEventType).subscribe(event => {
                expect(simpleSegmentEventType).toBe(event.type);
                resolve(true)
            });
        });

        Promise.all([promiseSpy1, promiseSpy2]).then(() => {
            done();
        });

        sharedEventBus.cast(simpleSegmentEvent);
    })

    it('Two different simple segment event launch', (done: DoneFn) => {
        const {sharedEventBus} = setup();
        const simpleSegmentEventType = 'simpleSegmentEvent';
        const simpleSegmentEventType2 = 'simpleSegmentEvent2';

        const simpleSegmentEvent: EventInterface = {
            data: {},
            type: simpleSegmentEventType
        };
        const simpleSegmentEvent2: EventInterface = {
            data: {},
            type: simpleSegmentEventType2
        };

        const promiseSpy1 = new Promise((resolve) => {
            sharedEventBus.on(simpleSegmentEventType).subscribe(event => {
                expect(simpleSegmentEventType).toBe(event.type);
                resolve(true);
            });
        });
        const promiseSpy2 = new Promise((resolve) => {
            sharedEventBus.on(simpleSegmentEventType2).subscribe(event => {
                expect(simpleSegmentEventType2).toBe(event.type);
                resolve(true)
            });
        });

        Promise.all([promiseSpy1, promiseSpy2]).then(() => {
            done();
        });

        sharedEventBus.cast(simpleSegmentEvent);
        sharedEventBus.cast(simpleSegmentEvent2);
    })

    it('One simple segment and one composed event launch', (done: DoneFn) => {
        const {sharedEventBus} = setup();
        const simpleSegmentEventType = 'simpleSegmentEvent';
        const composedSegmentEventType2 = 'simpleSegment:composedEvent';

        const simpleSegmentEvent: EventInterface = {
            data: {},
            type: simpleSegmentEventType
        };
        const composedSegmentEvent2: EventInterface = {
            data: {},
            type: composedSegmentEventType2
        };

        const promiseSpy1 = new Promise((resolve) => {
            sharedEventBus.on(simpleSegmentEventType).subscribe(event => {
                expect(simpleSegmentEventType).toBe(event.type);
                resolve(true);
            });
        });
        const promiseSpy2 = new Promise((resolve) => {
            sharedEventBus.on(composedSegmentEventType2).subscribe(event => {
                expect(composedSegmentEventType2).toBe(event.type);
                resolve(true)
            });
        });

        Promise.all([promiseSpy1, promiseSpy2]).then(() => {
            done();
        });

        sharedEventBus.cast(simpleSegmentEvent);
        sharedEventBus.cast(composedSegmentEvent2);
    })

    it('One simple segment and one composed event  launch', (done: DoneFn) => {
        const {sharedEventBus} = setup();
        const composedSegmentEventType = 'composedSegmentEvent:composedEvent';
        const composedSimpleWildcardSegmentEventType = 'composedSegmentEvent:*';

        const composedSegmentEvent: EventInterface = {
            data: {},
            type: composedSegmentEventType
        };

        const promiseSpy1 = new Promise((resolve) => {
            sharedEventBus.on(composedSegmentEventType).subscribe(event => {
                expect(composedSegmentEventType).toBe(event.type);
                resolve(true);
            });
        });
        const promiseSpy2 = new Promise((resolve) => {
            sharedEventBus.on(composedSimpleWildcardSegmentEventType).subscribe(event => {
                expect(composedSegmentEventType).toBe(event.type);
                resolve(true)
            });
        });

        Promise.all([promiseSpy1, promiseSpy2]).then(() => {
            done();
        });

        sharedEventBus.cast(composedSegmentEvent);
    })
});
