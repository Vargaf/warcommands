import { Component, OnInit } from '@angular/core';
import { TutorialComponentService } from '../tutorial-component.service';

@Component({
    selector: 'app-tutorial',
    templateUrl: './tutorial.component.html',
    styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

    constructor(
        private tutorialComponentService: TutorialComponentService,
    ) { }

    ngOnInit(): void {
    }

    close(): void {
        this.tutorialComponentService.close();
        console.log('close');
    }

}
