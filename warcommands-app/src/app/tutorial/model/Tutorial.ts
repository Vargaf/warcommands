import { TutorialStep } from "./TutorialStep";

export class Tutorial {
    steps: Map<string, TutorialStep>;

    constructor(private name: string) {
        this.steps = new Map();
    }

    addStep(tutorialStep: TutorialStep): void {
        this.steps.set(tutorialStep.stepName, tutorialStep);
    }

    tutorialName(): string {
        return this.name;
    }
}
