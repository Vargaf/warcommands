import { Observable } from 'rxjs';

export abstract class RequestAnimationFrameService {

    abstract updateFrameTime(): void;

    abstract onFrameUpdate(): Observable<number>;

    abstract getPreviousTime(): number;

    abstract getCurrentTime(): number;
}
