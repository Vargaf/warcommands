import * as CommandActions from 'src/ngrx/commands-panel/command/actions';
import * as CommandSelectors from 'src/ngrx/commands-panel/command/selectors';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';

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

    updateCommand(command: GenericCommandDTO): void {
        this.store.dispatch(CommandActions.updateCommand({ command }));
    }

    getCommand(commandId: string): Observable<GenericCommandDTO> {
        return this.store.pipe(select(CommandSelectors.commandSelector, { commandId }));
    }

    removeCommand(command: GenericCommandDTO): void {
        this.store.dispatch(CommandActions.removeCommand({ command }));
    }

    addClassMember(commandId: string, classMember: ClassMemberDTO): void {
        this.store.dispatch(CommandActions.addClassMember({ commandId, classMember }));
    }
}
