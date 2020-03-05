import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as CommandContainerSelectors from 'src/ngrx/commands-panel/command-container/selectors';
import * as CommandContainerActions from 'src/ngrx/commands-panel/command-container/actions';
import { CommandContainerDTO } from 'src/warcommands/commands-panel/domain/command-container/model/command-container.dto';
import { Observable } from 'rxjs';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';

@Injectable({
    providedIn: 'root'
})
export class CommandContainerNgrxRepositoryService {

    constructor(
        private readonly store: Store<CommandContainerSelectors.CommandContainerFeatureState>
    ) {}

    addCommandContainer(commandContainer: CommandContainerDTO): void {
        this.store.dispatch(CommandContainerActions.addCommandContainer({ commandContainer }));
    }

    getCommandContainer(commandContainerId: string): Observable<CommandContainerDTO> {
        return this.store.pipe(select(CommandContainerSelectors.commandContainerSelector, { commandContainerId }));
    }

    addCommandToCommandContainer(command: GenericCommandDTO, index: number): void {
        this.store.dispatch(CommandContainerActions.addCommandToCommandContainer({ command, index }));
    }

}