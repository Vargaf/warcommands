import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatStepper } from "@angular/material/stepper";
import { InitializeTutorialStepService } from "../services/initialize-tutorial-step.service";

@Component({
    selector: 'app-introduction',
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent implements AfterViewInit {

    private readonly TUTORIAL_NAME = "your_first_worker";

    @ViewChild('stepper', { static: false })
    stepper!: MatStepper;

    constructor(private initializeTutorialStepService: InitializeTutorialStepService) {}

    ngAfterViewInit(): void {
        this.initializeTutorialStepService.initialize(this.stepper, this.TUTORIAL_NAME);
    }
}
