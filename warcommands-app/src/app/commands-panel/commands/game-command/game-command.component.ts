import { Component, OnInit, Input } from '@angular/core';
import { GameCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command.entity';
import { GameClassDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/game-class-definition';

@Component({
    selector: 'app-game-command',
    templateUrl: './game-command.component.html',
    styleUrls: ['./game-command.component.scss']
})
export class GameCommandComponent implements OnInit {

    @Input() commandData: GameCommandEntity;

    gameCommandClassDefinition = GameClassDefinition;

    memberSelected: string;

    constructor() { }

    ngOnInit() {

    }

    onBaseMemberSelected(event): void {
        console.log('onBaseMemberSelected');
        console.log(event);
    }

    onBaseNameChange(event): void {
        console.log('onBaseNameChange');
        console.log(event);
    }

}
