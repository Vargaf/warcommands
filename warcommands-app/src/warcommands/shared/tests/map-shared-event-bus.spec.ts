import {EventInterface} from "../domain/event-bus/event.interface";
import {MapSharedEventBus} from "../infrastructure/event-bus/map-shared-event-bus";

describe('MapSharedEventBus service', () => {

    function setup() {
        const sharedEventBus = new MapSharedEventBus();

        return {sharedEventBus};
    }

    it('Simple segment event launch', (done: DoneFn) => {
        const {sharedEventBus} = setup();
        const simpleSegmentEventType = 'simpleSegmentEvent';

        const simpleSegmentEvent: EventInterface = {
            data: {},
            type: simpleSegmentEventType
        };

        const eventLaunchCallback = (event:EventInterface) => {
            expect(simpleSegmentEventType).toBe(event.type);
            done();
        }
        sharedEventBus.on(simpleSegmentEventType, eventLaunchCallback);

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
            const eventLaunchCallback = (event:EventInterface) => {
                expect(simpleSegmentEventType).toBe(event.type);
                resolve(true);
            };

            sharedEventBus.on(simpleSegmentEventType, eventLaunchCallback);
        });

        const promiseSpy2 = new Promise((resolve) => {
            const eventLaunchCallback = (event:EventInterface) => {
                expect(simpleSegmentEventType).toBe(event.type);
                resolve(true);
            };
            sharedEventBus.on(simpleSegmentEventType, eventLaunchCallback);
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
            const eventLaunchCallback = (event:EventInterface) => {
                expect(simpleSegmentEventType).toBe(event.type);
                resolve(true);
            };
            sharedEventBus.on(simpleSegmentEventType, eventLaunchCallback);
        });
        const promiseSpy2 = new Promise((resolve) => {
            const eventLaunchCallback = (event:EventInterface) => {
                expect(simpleSegmentEventType2).toBe(event.type);
                resolve(true);
            };
            sharedEventBus.on(simpleSegmentEventType2, eventLaunchCallback);
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
            const eventLaunchCallback = (event:EventInterface) => {
                expect(simpleSegmentEventType).toBe(event.type);
                resolve(true);
            };
            sharedEventBus.on(simpleSegmentEventType, eventLaunchCallback);
        });
        const promiseSpy2 = new Promise((resolve) => {
            const eventLaunchCallback = (event:EventInterface) => {
                expect(composedSegmentEventType2).toBe(event.type);
                resolve(true);
            };
            sharedEventBus.on(composedSegmentEventType2, eventLaunchCallback);
        });

        Promise.all([promiseSpy1, promiseSpy2]).then(() => {
            done();
        });

        sharedEventBus.cast(simpleSegmentEvent);
        sharedEventBus.cast(composedSegmentEvent2);
    })

    it('Two composed segments with 2 levels and wildcard', (done: DoneFn) => {
        const {sharedEventBus} = setup();
        const composedSegmentEventType = 'composedSegmentEvent:composedEvent';
        const composedSimpleWildcardSegmentEventType = 'composedSegmentEvent:*';

        const composedSegmentEvent: EventInterface = {
            data: {},
            type: composedSegmentEventType
        };

        const promiseSpy1 = new Promise((resolve) => {
            const eventLaunchCallback = (event:EventInterface) => {
                expect(composedSegmentEventType).toBe(event.type);
                resolve(true);
            };
            sharedEventBus.on(composedSegmentEventType, eventLaunchCallback);
        });
        const promiseSpy2 = new Promise((resolve) => {
            const eventLaunchCallback = (event:EventInterface) => {
                expect(composedSegmentEventType).toBe(event.type);
                resolve(true)
            };
            sharedEventBus.on(composedSimpleWildcardSegmentEventType, eventLaunchCallback);
        });

        Promise.all([promiseSpy1, promiseSpy2]).then(() => {
            done();
        });

        sharedEventBus.cast(composedSegmentEvent);
    })

    it('Three composed segment with 3 levels and wildcard only affects to two listeners', (done: DoneFn) => {
        const {sharedEventBus} = setup();

        const composedSegmentEventType = 'firstLevelSegment:SecondLevelSegment:ThirdLevelSegment';
        const secondLevelWildCard = 'firstLevelSegment:*:ThirdLevelSegment';
        const thirdLevelWildCard = 'firstLevelSegment:SecondLevelSegment:*';
        const missLevelWildCard = 'firstLevelSegment:*:ThirdLevelSegmentNotLaunch';

        const composedSegmentEvent: EventInterface = {
            data: {},
            type: composedSegmentEventType
        };

        const promiseSpy1 = new Promise((resolve) => {
            const eventLaunchCallback = (event:EventInterface) => {
                expect(composedSegmentEventType).toBe(event.type);
                resolve(true);
            };
            sharedEventBus.on(secondLevelWildCard, eventLaunchCallback);
        });

        const promiseSpy2 = new Promise((resolve) => {
            const eventLaunchCallback = (event:EventInterface) => {
                expect(composedSegmentEventType).toBe(event.type);
                resolve(true)
            };
            sharedEventBus.on(thirdLevelWildCard, eventLaunchCallback);
        });

        new Promise(() => {
            const eventLaunchCallback = () => {
                done.fail('missLevelWildCard listener should not be launched');
            };
            sharedEventBus.on(missLevelWildCard, eventLaunchCallback);
        });

        Promise.all([promiseSpy1, promiseSpy2]).then(() => {
            done();
        });

        sharedEventBus.cast(composedSegmentEvent);
    })

    it('Three segments with wildcard at the beginning and at the end last two segments match', (done: DoneFn) => {
        const {sharedEventBus} = setup();

        const composedSegmentEventType = 'quick:orange:rabbit';
        const firstWildCard = '*:orange:*';
        const secondWildCard = '*:*:rabbit';

        const composedSegmentEvent: EventInterface = {
            data: {},
            type: composedSegmentEventType
        };

        const promiseSpy1 = new Promise((resolve) => {
            const eventLaunchCallback = (event:EventInterface) => {
                expect(composedSegmentEventType).toBe(event.type);
                resolve(true);
            };
            sharedEventBus.on(firstWildCard, eventLaunchCallback);
        });

        const promiseSpy2 = new Promise((resolve) => {
            const eventLaunchCallback = (event:EventInterface) => {
                expect(composedSegmentEventType).toBe(event.type);
                resolve(true)
            };
            sharedEventBus.on(secondWildCard, eventLaunchCallback);
        });

        Promise.all([promiseSpy1, promiseSpy2]).then(() => {
            done();
        });

        sharedEventBus.cast(composedSegmentEvent);

    })

    it('Check registering two listeners to the same event', (done: DoneFn) => {
        const {sharedEventBus} = setup();
        const composedSegmentEventType = 'composedSegmentEvent:composedEvent';

        const composedSegmentEvent: EventInterface = {
            data: {},
            type: composedSegmentEventType
        };

        const promiseSpy1 = new Promise((resolve) => {
            const eventLaunchCallback = (event:EventInterface) => {
                expect(composedSegmentEventType).toBe(event.type);
                resolve(true);
            };
            sharedEventBus.on(composedSegmentEventType, eventLaunchCallback);
        });
        const promiseSpy2 = new Promise((resolve) => {
            const eventLaunchCallback = (event:EventInterface) => {
                expect(composedSegmentEventType).toBe(event.type);
                resolve(true)
            };
            sharedEventBus.on(composedSegmentEventType, eventLaunchCallback);
        });

        Promise.all([promiseSpy1, promiseSpy2]).then(() => {
            done();
        });

        sharedEventBus.cast(composedSegmentEvent);
    })

    it('Check the unsubscription', (done: DoneFn) => {
        const {sharedEventBus} = setup();

        const composedSegmentEventType = 'firstLevelSegment:SecondLevelSegment:ThirdLevelSegment';

        const composedSegmentEvent: EventInterface = {
            data: {},
            type: composedSegmentEventType
        };

        const eventLaunchCallbackUnsubscribed = () => {
            done.fail('This should be unsubscribed so not launched');
        };
        const eventToken = sharedEventBus.on(composedSegmentEventType, eventLaunchCallbackUnsubscribed);

        sharedEventBus.unregister(eventToken);

        sharedEventBus.cast(composedSegmentEvent);

        // To skip the jasmin warning for not having an expect on the test
        expect(true).toBe(true);

        done();

    })

    it('Check that when there is no more subscriptions the segment path is removed', (done: DoneFn) => {
        // This does not test anything, is only to develop the removal of the segments not used
        // It is a code smell and bad design, but is to avoid to inject the subscriber handler

        const {sharedEventBus} = setup();

        const composedSegmentEventType = 'firstLevelSegment:SecondLevelSegment:ThirdLevelSegment';

        const composedSegmentEvent: EventInterface = {
            data: {},
            type: composedSegmentEventType
        };

        const eventLaunchCallbackUnsubscribed1 = () => {
            done.fail('This should be unsubscribed so not launched');
        };
        const eventToken1 = sharedEventBus.on(composedSegmentEventType, eventLaunchCallbackUnsubscribed1);

        const eventLaunchCallbackUnsubscribed2 = () => {
            done.fail('This should be unsubscribed so not launched');
        };
        const eventToken2 = sharedEventBus.on(composedSegmentEventType, eventLaunchCallbackUnsubscribed2);

        sharedEventBus.unregister(eventToken1);
        sharedEventBus.unregister(eventToken2);

        sharedEventBus.cast(composedSegmentEvent);

        // To skip the jasmin warning for not having an expect on the test
        expect(true).toBe(true);

        done();
    })
});
