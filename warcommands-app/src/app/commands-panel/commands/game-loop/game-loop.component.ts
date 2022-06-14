import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GameLoopCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/game-loop-command.entity';
import { CommandNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-game-loop',
    templateUrl: './game-loop.component.html',
    styleUrls: ['./game-loop.component.scss']
})
export class GameLoopComponent implements OnInit, OnDestroy {

    @Input() commandData!: GameLoopCommandEntity;

    commandContainerId!: string;

    showCommandInvalidBackground = false;

    private commandDataSubscription!: Subscription;

    constructor(
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService
    ) { }

    ngOnInit() {

        if (this.commandData) {
            this.commandContainerId = this.commandData.innerCommandContainerIdList.commandContainerId;
            this.commandDataSubscription = this.commandNgrxRepositoryService.getCommand(this.commandData.id).subscribe((command) => {
                this.commandData = (command as GameLoopCommandEntity);

                setTimeout(() => {
                    this.showCommandInvalidBackground = command.commandPathErrorsCounter > 0;
                });
            });
        }
    }

    ngOnDestroy() {
        if (this.commandData) {
            this.commandDataSubscription.unsubscribe();
        }
    }

}
