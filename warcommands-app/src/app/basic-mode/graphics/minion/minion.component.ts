import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MinionEntity } from 'src/warcommands/gameEngine/domain/minion/model/minion.entity';
import { RequestAnimationFrameService } from 'src/warcommands/basic-mode/domain/request-animation-frame/request-animation-frame.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-minion',
    templateUrl: './minion.component.html',
    styleUrls: ['./minion.component.scss']
})
export class MinionComponent implements OnInit {

    @Input() data: MinionEntity;

    @ViewChild('minion', { static: true })
    public minionElement: ElementRef<HTMLDivElement>;

    private requestAnimationFrameIdEvent: Observable<number>;

    private movementDirection = 2;
    private xCoodinate: number;
    private maxMovement: number;
    private minMovement: number;

    constructor(
        private requestAnimationFrameService: RequestAnimationFrameService
    ) { }

    ngOnInit() {
        const minionCoordinates = this.getMinionCoordinates();
        this.minionElement.nativeElement.style.setProperty('top', minionCoordinates.top + 'px');
        this.minionElement.nativeElement.style.setProperty('left', minionCoordinates.left + 'px');

        this.requestAnimationFrameIdEvent = this.requestAnimationFrameService.getFrameId();
        this.requestAnimationFrameIdEvent.subscribe((frameId) => { this.onRequestAnimationFrameIdUpdate(); });

    }

    private getMinionCoordinates() {
        const coordinates = { top: 0, left: 0 };

        coordinates.top = this.data.yCoordinate * 50 + 25 / 2;
        coordinates.left = this.data.xCoordinate * 50 + 25 / 2;

        this.xCoodinate = coordinates.left;
        this.minMovement = coordinates.left;
        this.maxMovement = this.minMovement + 50;

        return coordinates;
    }

    private onRequestAnimationFrameIdUpdate() {

        const speed = (50 / (1000 / 60 ) / 3);

        if (this.xCoodinate >= this.maxMovement) {
            this.movementDirection = -1;
        }

        if (this.xCoodinate <= this.minMovement) {
            this.movementDirection = 1;
        }

        this.xCoodinate += (this.movementDirection * speed);
        this.minionElement.nativeElement.style.setProperty('left', this.xCoodinate + 'px');

    }

}
