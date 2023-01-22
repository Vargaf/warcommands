import { Injectable } from "@angular/core";
import { MatStepper } from "@angular/material/stepper";
import { TutorialStepsRepository } from "./tutorial-steps-repository";
import { Tutorial } from "../model/Tutorial";
import { TutorialFactory } from "./TutorialFactory";
import { TutorialStep } from "../model/TutorialStep";
import { TutorialStepsNgrxService } from "./tutorial-steps-ngrx.service";

@Injectable()
export class InitializeTutorialStepService {

    constructor(
        private tutorialStepsRepository: TutorialStepsRepository,
        private tutorialStepsNgrxService: TutorialStepsNgrxService,
    ) { }
    initialize(stepper:MatStepper, tutorialName: string): void {

        let stepLabels = this.buildStepLabelList(stepper);
        let tutorial: Tutorial;
        if(this.isTutorialAlreadyInMemory(tutorialName)) {
            tutorial = this.getSynchronizedSteps(tutorialName, stepLabels);
        } else {
            tutorial = TutorialFactory.make(tutorialName, stepLabels);
        }

        this.tutorialStepsRepository.save(tutorial);
        this.tutorialStepsNgrxService.addTutorial(tutorial);
    }

    tutorialStepVisited(tutorialName: string, tutorialStepLabel: string): void {
        let tutorial: Tutorial = this.tutorialStepsRepository.getTutorial(tutorialName);
        let tutorialStep: TutorialStep = new TutorialStep(tutorialStepLabel, true);
        tutorial.steps.set(tutorialStepLabel, tutorialStep);

        this.tutorialStepsRepository.save(tutorial);
        this.tutorialStepsNgrxService.stepVisited(tutorial);
    }

    private buildStepLabelList(stepper: MatStepper): Array<string> {
        let stepLabels:Array<string> = [];
        stepper.steps.forEach(function( step ) {
            stepLabels.push(step.label);
        });

        return stepLabels;
    }

    private isTutorialAlreadyInMemory(tutorialName: string): boolean {
        return this.tutorialStepsRepository.isTutorialAlreadyInMemory(tutorialName)
    }

    private getSynchronizedSteps(tutorialName: string, stepLabels: Array<string>): Tutorial {
        let synchronizedStepList: Tutorial = TutorialFactory.make(tutorialName, stepLabels);
        let existingStepList: Map<string, TutorialStep> = this.tutorialStepsRepository.getExistingSteps(tutorialName, stepLabels);

        synchronizedStepList.steps.forEach(function(tutorialStep: TutorialStep) {
            if(existingStepList.has(tutorialStep.stepName)) {
                let existingStep: TutorialStep = existingStepList.get(tutorialStep.stepName) as TutorialStep;
                if(existingStep.isAlreadyVisited()) {
                    let tutorialStep: TutorialStep = new TutorialStep(existingStep.stepName, existingStep.isAlreadyVisited());
                    synchronizedStepList.steps.set(tutorialStep.stepName, tutorialStep);
                }
            }
        })

        return synchronizedStepList;
    }
}
