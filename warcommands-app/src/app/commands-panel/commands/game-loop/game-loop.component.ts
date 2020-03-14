import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GameLoopCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/game-loop-command.enntity';
import { CommandNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
    selector: 'app-game-loop',
    templateUrl: './game-loop.component.html',
    styleUrls: ['./game-loop.component.scss']
})
export class GameLoopComponent implements OnInit, OnDestroy {

    @Input() commandData: GameLoopCommandEntity;

    commandContainerId: string;

    private commandDataSubscription: Subscription;

    constructor(
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService
    ) { }

    ngOnInit() {
        if (this.commandData) {
            this.commandContainerId = this.commandData.innerCommandContainerIdList.commandContainerId;
            this.commandDataSubscription = this.commandNgrxRepositoryService.getCommand(this.commandData.id).subscribe((command) => {
                this.commandData = (command as GameLoopCommandEntity);
            });
        }
    }

    ngOnDestroy() {
        this.commandDataSubscription.unsubscribe();
    }

}
