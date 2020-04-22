import { Observable } from 'rxjs';

export abstract class RequestAnimationFrameService {

    //abstract updateFrameId(frameId: number): void;

    //abstract getFrameId(): Observable<number>;

    abstract updateFrameTime(): void;

    abstract onUpdateFrame(): Observable<number>;

    abstract getPreviousTime(): number;

    abstract getCurrentTime(): number;
}
