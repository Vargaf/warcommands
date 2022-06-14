import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IfThenElseCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/if-then-else-command.entity';
import { CommandNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-if-then-else',
    templateUrl: './if-then-else.component.html',
    styleUrls: ['./if-then-else.component.scss']
})
export class IfThenElseComponent implements OnInit, OnDestroy {

    @Input() commandData!: IfThenElseCommandEntity;

    thenCommandContainerId!: string;
    elseCommandContainerId!: string;

    private commandDataSubscription!: Subscription;

    constructor(
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService
    ) { }

    ngOnInit() {
        if (this.commandData) {
            this.thenCommandContainerId = this.commandData.innerCommandContainerIdList.thenCommandContainerId;
            this.elseCommandContainerId = this.commandData.innerCommandContainerIdList.elseCommandContainerId;
            this.commandDataSubscription = this.commandNgrxRepositoryService.getCommand(this.commandData.id).subscribe((command) => {
                this.commandData = (command as IfThenElseCommandEntity);
            });
        }
    }

    ngOnDestroy() {
        if (this.commandData) {
            this.commandDataSubscription.unsubscribe();
        }
    }

}
