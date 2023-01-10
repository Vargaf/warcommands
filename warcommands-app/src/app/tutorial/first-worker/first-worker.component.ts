import {Component, ViewChild} from '@angular/core';
import {MatStepper} from "@angular/material/stepper";

@Component({
    selector: 'app-first-worker',
    templateUrl: './first-worker.component.html',
    styleUrls: ['./first-worker.component.scss']
})
export class FirstWorkerComponent {

    @ViewChild('stepper', { static: false })
    stepper!: MatStepper;

    selectedIndex = 0;

    constructor() {
    }

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
        console.log(this.selectedIndex);
    }

}
