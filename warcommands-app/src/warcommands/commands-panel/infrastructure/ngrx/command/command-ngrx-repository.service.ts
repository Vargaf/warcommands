import * as CommandActions from 'src/ngrx/commands-panel/command/actions';
import * as CommandSelectors from 'src/ngrx/commands-panel/command/selectors';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';

@Injectable({
   providedIn: 'root'
})
export class CommandNgrxRepositoryService {
    constructor(
        private readonly store: Store<CommandSelectors.CommandFeatureState>
    ) { }

    saveCommand(command: GenericCommandDTO): void {
        this.store.dispatch(CommandActions.addCommand({ command }));
    }

    getCommand(commandId: string): Observable<GenericCommandDTO> {
        return this.store.pipe(select(CommandSelectors.commandSelector, { commandId }));
    }
}
