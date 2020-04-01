import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GameCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command.entity';
import { GameClassOptionsDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/game-class-options-definition';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { CommandNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service';
import { Subscription } from 'rxjs';
import { CommandClassMemberAddedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-class-member-added-events';

@Component({
    selector: 'app-game-command',
    templateUrl: './game-command.component.html',
    styleUrls: ['./game-command.component.scss']
})
export class GameCommandComponent implements OnInit, OnDestroy {

    @Input() commandData: GameCommandEntity;

    gameCommandClassDefinition = GameClassOptionsDefinition;

    memberSelected: string;

    private commandDataSubscription: Subscription;

    constructor(
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService,
        private readonly commandClassMemberAddedEvent: CommandClassMemberAddedEvents
    ) { }

    ngOnInit() {
        if (this.commandData) {
            this.commandDataSubscription = this.commandNgrxRepositoryService.getCommand(this.commandData.id).subscribe((command) => {
                this.commandData = (command as GameCommandEntity);

                if (command.classMember) {
                    this.memberSelected = command.classMember.memberName;
                }
            });
        }
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.commandClassMemberAddedEvent.commandClassMemberAddedDispatch(this.commandData.id, classMember);
    }

    ngOnDestroy() {
        this.commandDataSubscription.unsubscribe();
    }

}
