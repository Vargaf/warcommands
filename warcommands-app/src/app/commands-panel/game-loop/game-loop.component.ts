import { Component, OnInit, Input } from '@angular/core';
import { GameLoopCommandEntity } from 'src/warcommands/commands/domain/command/model/game-loop-command.enntity';

@Component({
    selector: 'app-game-loop',
    templateUrl: './game-loop.component.html',
    styleUrls: ['./game-loop.component.scss']
})
export class GameLoopComponent implements OnInit {

    @Input() commandData: GameLoopCommandEntity;

    commandContainerId: string;

    constructor() {
    }

    ngOnInit() {
        this.commandContainerId = this.commandData.innerCommandContainerIdList.commandContainerId;
    }
}
