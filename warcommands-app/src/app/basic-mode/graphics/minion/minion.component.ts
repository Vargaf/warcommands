import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MinionEntity } from 'src/warcommands/gameEngine/domain/minion/model/minion.entity';

@Component({
    selector: 'app-minion',
    templateUrl: './minion.component.html',
    styleUrls: ['./minion.component.scss']
})
export class MinionComponent implements OnInit {

    @Input() data: MinionEntity;

    @ViewChild('minion', { static: true })
    public minionElement: ElementRef<HTMLDivElement>;

    constructor() { }

    ngOnInit() {
        const minionCoordinates = this.getMinionCoordinates();
        this.minionElement.nativeElement.style.setProperty('top', minionCoordinates.top + 'px');
        this.minionElement.nativeElement.style.setProperty('left', minionCoordinates.left + 'px');
    }

    getMinionCoordinates() {
        const coordinates = { top: 0, left: 0 };

        coordinates.top = this.data.yCoordinate * 100 + 25;
        coordinates.left = this.data.xCoordinate * 100 + 25;

        return coordinates;
    }

}
