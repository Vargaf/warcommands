import { CommandContainerRepositoryService } from 'src/warcommands/commands/domain/command-container/services/command-container-repository.service';
import * as CommandContainerSelectors from 'src/ngrx/commands-panel/command-container/selectors';
import * as CommandContainerActions from 'src/ngrx/commands-panel/command-container/actions';
import { Store, select } from '@ngrx/store';
import { CommandContainerDTO, CommandContainerListDTO } from 'src/warcommands/commands/domain/command-container/model/command-container.dto';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CommandInterface } from 'src/warcommands/commands/domain/command/model/command.interface';

@Injectable({
    providedIn: 'root'
})
export class CommandContainerNgrxRepositoryService implements CommandContainerRepositoryService {

    constructor(
        private readonly store: Store<CommandContainerSelectors.CommandContainerFeatureState>
    ) {}

    saveCommandContainer(commandContainer: CommandContainerDTO): void {
        this.store.dispatch(CommandContainerActions.addCommandContainer({ commandContainer }));
    }

    getCommandContainer(commandContainerId: string): Observable<CommandContainerDTO> {
        return this.store.pipe(select(CommandContainerSelectors.commandContainerSelector, { commandContainerId }));
    }

    addCommandToCommandContainer(command: CommandInterface, index: number): void {
        this.store.dispatch(CommandContainerActions.addCommandToCommandContainer({ command, index }));
    }

    moveCommandSameContainer(commandContainerId: string, previousIndex: number, currentIndex: number): void {
        this.store.dispatch(CommandContainerActions.moveCommandSameContainer({ commandContainerId, previousIndex, currentIndex }));
    }

    removeCommandFromCommandContainer(commandContainerId: string, commandId: string): void {
        this.store.dispatch(CommandContainerActions.removeCommandFromCommandContainer({ commandContainerId, commandId }));
    }

    getCommandContainerOnPage(fileId: string): Observable<CommandContainerListDTO> {
        return this.store.pipe(select(CommandContainerSelectors.getCommandContainersOnPage, { fileId }));
    }
}
