import { Injectable } from "@angular/core";
import { TutorialStep } from "../model/TutorialStep";
import { Tutorial } from "../model/Tutorial";
import { TutorialTransformer } from "./tutorial-transformer";
import { TutorialFactory } from "./TutorialFactory";

@Injectable()
export class TutorialStepsRepository {

    private readonly tutorialRepositoryLocalStorageKey = "tutorialRepository";
    private inMemory:Map<string, Tutorial>;

    constructor() {
        this.inMemory = new Map();
        this.loadFromLocalStorage();
    }

    isTutorialAlreadyInMemory(tutorialName: string): boolean
    {
        return this.inMemory.has(tutorialName);
    }

    save(tutorial: Tutorial): void {
        this.saveInMemory(tutorial);
        let tutorialPath = TutorialTransformer.transformPath(this.inMemory);
        let stringifyTutorialList = JSON.stringify(tutorialPath);
        localStorage.setItem(this.tutorialRepositoryLocalStorageKey, stringifyTutorialList);
    }

    getTutorial(tutorialName: string): Tutorial {
        return this.inMemory.get(tutorialName) as Tutorial;
    }

    getNewSteps(tutorialName: string, stepLabels: Array<string>): Array<string> {
        let newSteps: Array<string> = [];

        if(this.inMemory.has(tutorialName)) {
            let tutorial: Tutorial = this.inMemory.get(tutorialName) as Tutorial;
            stepLabels.forEach(function( label ) {
                if(!tutorial.steps.has(label)) {
                    newSteps.push(label);
                }
            });
        }

        return newSteps;
    }

    getDeprecatedSteps(tutorialName: string, stepLabels: Array<string>): Array<string> {
        let deprecatedSteps: Array<string> = [];

        if(this.inMemory.has(tutorialName)) {
            let tutorial: Tutorial = this.inMemory.get(tutorialName) as Tutorial;
            tutorial.steps.forEach(function( tutorialStep: TutorialStep ) {
                let stepLabelInBothLists = stepLabels.find(label => label == tutorialStep.stepName);

                if(stepLabelInBothLists == undefined) {
                    deprecatedSteps.push(tutorialStep.stepName);
                }
            })
        }

        return deprecatedSteps;
    }

    getExistingSteps(tutorialName: string, stepLabels: Array<string>): Map<string, TutorialStep> {
        let existingStepList: Map<string, TutorialStep> = new Map();

        if(this.inMemory.has(tutorialName)) {
            let tutorial: Tutorial = this.inMemory.get(tutorialName) as Tutorial;

            stepLabels.forEach(function( label ) {
                if(tutorial.steps.has(label)) {
                    let tutorialStep: TutorialStep = tutorial.steps.get(label) as TutorialStep;
                    let existingStep: TutorialStep = new TutorialStep(tutorialStep.stepName, tutorialStep.isAlreadyVisited());
                    existingStepList.set(tutorialStep.stepName, existingStep);
                }
            });
        }

        return existingStepList;
    }

    private saveInMemory(tutorial: Tutorial): void {
        this.inMemory.set(tutorial.tutorialName(), tutorial);
    }

    private loadFromLocalStorage(): void {
        let inLocalStorage = localStorage.getItem(this.tutorialRepositoryLocalStorageKey);

        if(inLocalStorage) {
            let tutorialList = TutorialFactory.makeFromArray(JSON.parse(inLocalStorage));
            tutorialList.forEach(( tutorial ) => this.saveInMemory(tutorial) );
        }
    }
}
