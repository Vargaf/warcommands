import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CommandMovedEventDTO } from './command-modeved-event.dto';

interface SubjectEventList {
    [commandContainerId: string]: Subject<any>;
}

@Injectable({
    providedIn: 'root'
})
export class CommandMovedEvents {

    private readonly commandMovedFromSubjectList: SubjectEventList = {};
    private readonly commandMovedToSubjectList: SubjectEventList = {};
    private readonly commandMoved: Subject<CommandMovedEventDTO> = new Subject<CommandMovedEventDTO>();

    commandMovedDispatch(commandMovedEventDTO: CommandMovedEventDTO): void {
        this.commandMoved.next(commandMovedEventDTO);
    }

    commandMovedListener(): Observable<CommandMovedEventDTO> {
        return this.commandMoved;
    }

    commandMovedFromCommandContainerDispatch(commandMovedEventDTO: CommandMovedEventDTO): void {
        const commandContainerIdFrom = commandMovedEventDTO.fromContainerId;
        this.initializeCommandMovedFromSubject(commandContainerIdFrom);
        this.commandMovedFromSubjectList[commandContainerIdFrom].next(commandMovedEventDTO);
    }

    commandMovedFromCommandContainerListener(commandContainerIdFrom: string): Observable<CommandMovedEventDTO> {
        this.initializeCommandMovedFromSubject(commandContainerIdFrom);
        return this.commandMovedFromSubjectList[commandContainerIdFrom];
    }

    commandMovedToCommandContainerDispatch(commandMovedEventDTO: CommandMovedEventDTO): void {
        const commandContainerIdTo = commandMovedEventDTO.toContainerId;
        this.initializeCommandMovedToSubject(commandContainerIdTo);
        this.commandMovedToSubjectList[commandContainerIdTo].next(commandMovedEventDTO);
    }

    commandMovedToCommandContainerListener(commandContainerIdTo: string): Observable<CommandMovedEventDTO> {
        this.initializeCommandMovedToSubject(commandContainerIdTo);
        return this. commandMovedToSubjectList[commandContainerIdTo];
    }

    private initializeCommandMovedFromSubject(commandContainerId: string): void {
        if (this.commandMovedFromSubjectList[commandContainerId] === undefined) {
            this.commandMovedFromSubjectList[commandContainerId] = new Subject<CommandMovedEventDTO>();
        }
    }

    private initializeCommandMovedToSubject(commandContainerId: string): void {
        if (this.commandMovedToSubjectList[commandContainerId] === undefined) {
            this.commandMovedToSubjectList[commandContainerId] = new Subject<CommandMovedEventDTO>();
        }
    }

}
