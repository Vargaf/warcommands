import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CommandAddedEventDTO } from './command-added-event.dto';

interface SubjectEventList {
    [commandContainerId: string]: Subject<any>;
}

@Injectable({
    providedIn: 'root'
})
export class CommandCreatedEvents {

    private readonly commandCreatedSubjectList: Subject<CommandAddedEventDTO> = new Subject<CommandAddedEventDTO>();
    private readonly commandAddedToCommandContainerSubjectList: SubjectEventList = {};

    commandCreatedDispatch(commandAdded: CommandAddedEventDTO): void {
        this.commandCreatedSubjectList.next(commandAdded);
    }

    commandCreatedListener(): Observable<CommandAddedEventDTO> {
        return this.commandCreatedSubjectList;
    }

    commandAddedToCommandContainerDispatch(commandAdded: CommandAddedEventDTO): void {
        const commandContainerId: string = commandAdded.command.parentCommandContainerId;
        this.initializeCommandAddedToCommandContainer(commandContainerId);
        this.commandAddedToCommandContainerSubjectList[commandContainerId].next(commandAdded);
    }

    commandAddedToCommandContainerListener(commandContainerId: string): Observable<CommandAddedEventDTO> {
        this.initializeCommandAddedToCommandContainer(commandContainerId);
        return this.commandAddedToCommandContainerSubjectList[commandContainerId];
    }

    private initializeCommandAddedToCommandContainer(commandContainerId: string): void {
        if (this.commandAddedToCommandContainerSubjectList[commandContainerId] === undefined) {
            this.commandAddedToCommandContainerSubjectList[commandContainerId] = new Subject<CommandAddedEventDTO>();
        }
    }

}
