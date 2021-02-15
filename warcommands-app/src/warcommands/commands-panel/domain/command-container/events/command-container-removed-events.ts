import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CommandContainerDTO } from '../model/command-container.dto';

@Injectable({
    providedIn: 'root'
})
export class CommandContainerRemovedEvents {

    private readonly commandContainerRemovedSubjectList: Subject<CommandContainerDTO> = new Subject<CommandContainerDTO>();

    commandContainerRemovedDispatch(commandContainerDTO: CommandContainerDTO): void {
        this.commandContainerRemovedSubjectList.next(commandContainerDTO);
    }

    commandContainerRemovedListener(): Observable<CommandContainerDTO> {
        return this.commandContainerRemovedSubjectList;
    }

}
