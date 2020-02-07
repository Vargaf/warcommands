import { Observable } from 'rxjs';

export abstract class RequestAnimationFrameService {

    abstract updateFrameId(frameId: number): void;

    abstract getFrameId(): Observable<number>;
}
