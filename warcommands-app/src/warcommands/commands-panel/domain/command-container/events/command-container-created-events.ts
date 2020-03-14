import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CommandContainerDTO } from '../model/command-container.dto';

@Injectable({
    providedIn: 'root'
})
export class CommandContainerCreatedEvents {

    private readonly commandContainerCreatedSubjectList: Subject<CommandContainerDTO> = new Subject<CommandContainerDTO>();

    newCommandContainerDispatch(commandContainer: CommandContainerDTO): void {
        this.commandContainerCreatedSubjectList.next(commandContainer);
    }

    newCommandContainerListener(): Observable<CommandContainerDTO> {
        return this.commandContainerCreatedSubjectList;
    }

}
