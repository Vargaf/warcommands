import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IfThenCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/if-then-command.entity';
import { CommandNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-if-then',
    templateUrl: './if-then.component.html',
    styleUrls: ['./if-then.component.scss']
})
export class IfThenComponent implements OnInit, OnDestroy {

    @Input() commandData: IfThenCommandEntity;

    thenCommandContainerId: string = undefined;

    private commandDataSubscription: Subscription;

    constructor(
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService
    ) { }

    ngOnInit() {
        if (this.commandData) {
            this.thenCommandContainerId = this.commandData.innerCommandContainerIdList.thenCommandContainerId;
            this.commandDataSubscription = this.commandNgrxRepositoryService.getCommand(this.commandData.id).subscribe((command) => {
                this.commandData = (command as IfThenCommandEntity);
            });
        }
    }

    ngOnDestroy() {
        this.commandDataSubscription.unsubscribe();
    }

}
