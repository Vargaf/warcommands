import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GameCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command.entity';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { CommandClassMemberAddedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-class-member-added-events';
import * as _ from 'lodash';
import { CommandNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-game-command',
    templateUrl: './game-command.component.html',
    styleUrls: ['./game-command.component.scss']
})
export class GameCommandComponent implements OnInit, OnDestroy {

    @Input() commandData: GameCommandEntity;
    gameCommand: GameCommandEntity;

    showCommandInvalidBackground = false;

    private subscriptionManager: Subscription = new Subscription();

    constructor(
        private readonly commandClassMemberAddedEvent: CommandClassMemberAddedEvents,
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService,
    ) { }

    ngOnInit() {

        this.initializeClassMember();

    }

    ngOnDestroy(): void {
        this.subscriptionManager.unsubscribe();
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.commandClassMemberAddedEvent.commandClassMemberAddedDispatch(this.gameCommand.id, classMember);
    }

    private initializeClassMember(): void {
        this.gameCommand = _.cloneDeep(this.commandData);

        const subscription = this.commandNgrxRepositoryService.getCommand(this.gameCommand.id).subscribe((command) => {
            this.gameCommand = (_.cloneDeep(command) as GameCommandEntity);

            if (command) {
                this.showCommandInvalidBackground = command.commandPathErrorsCounter > 0;
            }
            
        });

        this.subscriptionManager.add(subscription);
    }

}
