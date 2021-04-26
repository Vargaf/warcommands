
export class GameLogicClockService {

    private previousTime: number = 0;
    private currentTime: number = 0;
    private deltaTime: number = 0;
    private elapsedTime: number = 0;

    private isRunning: boolean = false;
    
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
    
    getDeltaTime(): number {
        return this.deltaTime;
    }

    private now(): number {
        return ( typeof performance === 'undefined' ? Date : performance ).now();
    }

    private updateElapsedTime(): void {
        this.deltaTime = this.currentTime - this.previousTime;
        this.elapsedTime += this.deltaTime;
    }
    
}