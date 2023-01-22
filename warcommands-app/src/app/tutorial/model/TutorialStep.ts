
export class TutorialStep {

    constructor( readonly stepName: string, private alreadyVisited: boolean) {
    }

    isAlreadyVisited(): boolean {
        return this.alreadyVisited;
    }
}
