import { Component, OnInit, Input } from '@angular/core';
import { GameCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command.entity';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { CommandClassMemberAddedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-class-member-added-events';
import * as _ from 'lodash';

@Component({
    selector: 'app-game-command',
    templateUrl: './game-command.component.html',
    styleUrls: ['./game-command.component.scss']
})
export class GameCommandComponent implements OnInit {

    @Input() commandData: GameCommandEntity;
    gameCommand: GameCommandEntity;

    constructor(
        private readonly commandClassMemberAddedEvent: CommandClassMemberAddedEvents
    ) { }

    ngOnInit() {

        this.initializeClassMember();

    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.commandClassMemberAddedEvent.commandClassMemberAddedDispatch(this.gameCommand.id, classMember);
    }

    private initializeClassMember(): void {
        this.gameCommand = _.cloneDeep(this.commandData);
    }

}
