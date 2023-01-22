import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatStep, MatStepper } from "@angular/material/stepper";
import { InitializeTutorialStepService } from "../services/initialize-tutorial-step.service";
import { TutorialStepsNgrxService } from "../services/tutorial-steps-ngrx.service";
import { StepperSelectionEvent } from "@angular/cdk/stepper";
import { Subscriber } from "rxjs";

@Component({
    selector: 'app-first-worker',
    templateUrl: './first-worker.component.html',
    styleUrls: ['./first-worker.component.scss']
})
export class FirstWorkerComponent implements AfterViewInit, OnDestroy {

    private readonly TUTORIAL_NAME = 'first_worker_steps';

    @ViewChild('stepper', { static: false })
    stepper!: MatStepper;

    selectedIndex = 0;

    private subscriptions: Subscriber<any> = new Subscriber<any>();

    constructor(
        private initializeTutorialStepService: InitializeTutorialStepService,
        private tutorialStepsNgrxService: TutorialStepsNgrxService) { }

    next(): void {
        if(this.stepper.steps.length > this.selectedIndex) {
            this.selectedIndex++;
        }
        console.log(this.selectedIndex);
    }

    back():void {
        if(this.selectedIndex > 0) {
            this.selectedIndex--;
        }
    }

    ngAfterViewInit(): void {
        this.initializeTutorialStepService.initialize(this.stepper, this.TUTORIAL_NAME);

        const selectionChangeSubscription = this.stepper.selectionChange.subscribe((event: StepperSelectionEvent) => {
            this.initializeTutorialStepService.tutorialStepVisited(this.TUTORIAL_NAME, event.selectedStep.label);
        });

        this.subscriptions.add(selectionChangeSubscription);

        const onTutorialChangeSubscription = this.tutorialStepsNgrxService.onTutorialChange(this.TUTORIAL_NAME).subscribe((tutorial) => {
            const thisArg = this;
            if(tutorial) {
                tutorial.forEach((tutorialStep, index: number) => {
                    if(tutorialStep.isAlreadyVisited) {
                        let matStep: MatStep = thisArg.stepper.steps.get(index) as MatStep;
                        matStep.state = 'done';
                    }
                }, thisArg)
            }
        });

        this.subscriptions.add(onTutorialChangeSubscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
