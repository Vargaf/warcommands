import { BehaviorSubject, Observable } from "rxjs";

export class GameLogicClockService {

    private previousTime: number = 0;
    private currentTime: number = 0;
    private deltaTime: number = 0;
    private elapsedTime: number = 0;

    private isRunning: boolean = false;
    private currentSpeedIndex = 1;
    private availableSpeeds = [ 0.5, 1, 2, 4 ];

    private currentSpeedSubject: BehaviorSubject<number> = new BehaviorSubject(1);
    
    start(): void {
        this.isRunning = true;
        this.currentTime = this.now();
        this.previousTime = this.currentTime;
        this.deltaTime = 0;
    }

    stop(): void {
        this.isRunning = false;
    }
        
    updateFrameTime(): void {
        if(this.isRunning) {
            this.previousTime = this.currentTime;
            this.currentTime = this.now();
            this.updateElapsedTime();
        }
    }
    
    getElapsedTime(): number {
        return this.elapsedTime;
    }

    speedUp(): void {
        if(this.currentSpeedIndex < this.availableSpeeds.length - 1) {
            this.currentSpeedIndex++;
            this.currentSpeedSubject.next(this.getCurrentSpeed());
        }
    }

    slowDown(): void {
        if(this.currentSpeedIndex > 0) {
            this.currentSpeedIndex--;
            this.currentSpeedSubject.next(this.getCurrentSpeed());
        }
    }

    currentSpeedObservable(): Observable<number> {
        return this.currentSpeedSubject;
    }

    private now(): number {
        return ( typeof performance === 'undefined' ? Date : performance ).now();
    }

    private updateElapsedTime(): void {
        this.deltaTime = this.currentTime - this.previousTime;
        this.deltaTime = this.deltaTime * this.getCurrentSpeed();
        this.elapsedTime += this.deltaTime;
    }

    private getCurrentSpeed(): number {
        return this.availableSpeeds[this.currentSpeedIndex];
    }
}