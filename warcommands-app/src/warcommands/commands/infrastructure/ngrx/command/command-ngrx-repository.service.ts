import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as CommandActions from 'src/ngrx/commands-panel/command/actions';
import * as CommandSelectors from 'src/ngrx/commands-panel/command/selectors';
import { CommandRepositoryService } from 'src/warcommands/commands/domain/command/services/command-repository.service';
import { CommandInterface } from 'src/warcommands/commands/domain/command/model/command.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommandNgrxRepositoryService implements CommandRepositoryService {
    constructor(
        private readonly store: Store<CommandSelectors.CommandFeatureState>
    ) { }

    saveCommand(command: CommandInterface): void {
        this.store.dispatch(CommandActions.addCommand({ command }));
    }

    getCommand(commandId: string): Observable<CommandInterface> {
        return this.store.pipe(select(CommandSelectors.commandSelector, { commandId }));
    }
}