import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GameCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command.entity';
import { GameClassOptionsDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/game-class-options-definition';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { CommandClassMemberAddedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-class-member-added-events';
import { MatSelectChange } from '@angular/material/select';
import * as _ from 'lodash';

@Component({
    selector: 'app-game-command',
    templateUrl: './game-command.component.html',
    styleUrls: ['./game-command.component.scss']
})
export class GameCommandComponent implements OnInit {

    @Input() commandData: GameCommandEntity;

    gameCommand: GameCommandEntity;

    gameCommandClassDefinition = GameClassOptionsDefinition;

    memberSelected: string;

    constructor(
        private readonly commandClassMemberAddedEvent: CommandClassMemberAddedEvents
    ) { }

    ngOnInit() {
        this.gameCommand = _.cloneDeep(this.commandData);

        if (this.gameCommand.classMember) {
            this.memberSelected = this.gameCommand.classMember.memberName;
        }
    }

    onOptionMemberChanged(event: MatSelectChange): void {
        this.memberSelected = event.value;
        this.gameCommand.classMember = null;
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.commandClassMemberAddedEvent.commandClassMemberAddedDispatch(this.gameCommand.id, classMember);
    }

}
