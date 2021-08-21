import { Component, OnInit } from '@angular/core';
import { TutorialComponentToggleServiceInterface } from "src/warcommands/tutorial-component/domain/tutorial-component/services/tutorial-component-toggle-service.interface";

@Component({
    selector: 'app-tutorial',
    templateUrl: './tutorial.component.html',
    styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

    constructor(
        private tutorialComponentToggleService: TutorialComponentToggleServiceInterface
    ) { }

    ngOnInit(): void {
    }

    close(): void {
        this.tutorialComponentToggleService.close();
    }

}
