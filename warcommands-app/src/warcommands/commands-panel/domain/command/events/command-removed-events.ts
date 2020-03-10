import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { GenericCommandDTO } from '../model/generic-command.dto';

interface SubjectEventList {
    [commandContainerId: string]: Subject<any>;
}

@Injectable({
    providedIn: 'root'
})
export class CommandRemovedEvents {

    private readonly commandRemovedSubjectList: Subject<GenericCommandDTO> = new Subject<GenericCommandDTO>();
    private readonly commandRemovedFromCommandContainerSubjectList: SubjectEventList = {};

    commandRemovedDispatch(command: GenericCommandDTO): void {
        this.commandRemovedSubjectList.next(command);
    }

    commandRemovedListener(): Observable<GenericCommandDTO> {
        return this.commandRemovedSubjectList;
    }

    commandRemovedFromCommandContainerDispatch(command: GenericCommandDTO): void {
        const commandContainerId = command.parentCommandContainerId;
        this.initializeCommandRemovedFromCommandContainerSubject(commandContainerId);
        this.commandRemovedFromCommandContainerSubjectList[commandContainerId].next(command);
    }

    commandRemovedFromCommandContainerListener(commandContainerId: string): Observable<GenericCommandDTO> {
        return this.commandRemovedFromCommandContainerSubjectList[commandContainerId];
    }

    private initializeCommandRemovedFromCommandContainerSubject(commandContainerId: string): void {
        if (this.commandRemovedFromCommandContainerSubjectList[commandContainerId] === undefined) {
            this.commandRemovedFromCommandContainerSubjectList[commandContainerId] = new Subject<GenericCommandDTO>();
        }
    }

}
