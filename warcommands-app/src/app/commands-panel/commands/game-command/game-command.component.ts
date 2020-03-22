import { Component, OnInit, Input } from '@angular/core';
import { GameCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command.entity';
import { GameClassOptionsDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/game-class-options-definition';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';

@Component({
    selector: 'app-game-command',
    templateUrl: './game-command.component.html',
    styleUrls: ['./game-command.component.scss']
})
export class GameCommandComponent implements OnInit {

    @Input() commandData: GameCommandEntity;

    gameCommandClassDefinition = GameClassOptionsDefinition;

    memberSelected: string;

    constructor() { }

    ngOnInit() {

    }

    onClassMemberSelected(event: ClassMemberDTO): void {
        console.log('onClassMemberSelected');
        console.log(event);
    }

}
