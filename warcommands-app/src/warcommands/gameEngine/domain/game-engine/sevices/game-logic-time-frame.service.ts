
export class GameLogicTimeFrameService {

    private previousTime: number = 0;
    private currentTime: number = 0;
    
    constructor() {
        this.previousTime = (performance || Date ).now();
        this.currentTime = this.previousTime;
    }
        
    updateFrameTime(): void {
        this.previousTime = this.currentTime;
        this.currentTime = (performance || Date ).now();
    }
    
    getPreviousTime(): number {
        return this.previousTime;
    }

    getCurrentTime(): number {
        return this.currentTime;
    }
    
}