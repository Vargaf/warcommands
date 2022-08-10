import {Observable} from "rxjs";

export abstract class TutorialComponentToggleServiceInterface {

    abstract toggle(): void;

    abstract open(): void;

    abstract close(): void;

    abstract closeListener(): Observable<void>;

    abstract openListener(): Observable<void>;

}
