import { Component } from '@angular/core';
import { TutorialComponentToggleServiceInterface } from "src/warcommands/tutorial/domain/tutorial/services/tutorial-component-toggle-service.interface";

@Component({
    selector: 'app-tutorial',
    templateUrl: './tutorial.component.html',
    styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent {

    constructor(
        private tutorialComponentToggleService: TutorialComponentToggleServiceInterface
    ) {}

    close(): void {
        this.tutorialComponentToggleService.close();
    }
}
