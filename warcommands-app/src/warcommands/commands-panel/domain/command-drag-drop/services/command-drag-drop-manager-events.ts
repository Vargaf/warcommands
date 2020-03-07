import { Injectable } from '@angular/core';
import { CommandWrapperDTO } from '../model/command-wrapper.dto';
import { Subject, Observable } from 'rxjs';

interface CommandDroppedSubjectList {
    [commandContainerId: string]: Subject<CommandWrapperDTO>;
}

@Injectable({
    providedIn: 'root'
})
export class CommandDragDropManagerEvents {

    private readonly newCommandDroppedSubjectList: CommandDroppedSubjectList = {};
    private readonly moveCommandDroppedSubjectList: CommandDroppedSubjectList = {};

    newCommandDroppedDispatch(commandDropped: CommandWrapperDTO): void {
        this.initializeNewCommandDroppedSubject(commandDropped.containerId);
        this.newCommandDroppedSubjectList[commandDropped.containerId].next(commandDropped);
    }

    newCommandDroppedListener(commandContainerId: string): Observable<CommandWrapperDTO> {
        this.initializeNewCommandDroppedSubject(commandContainerId);
        return this.newCommandDroppedSubjectList[commandContainerId];
    }

    moveCommandDroppedDispatch(commandDropped: CommandWrapperDTO): void {
        this.initializeNewCommandDroppedSubject(commandDropped.containerId);
        this.moveCommandDroppedSubjectList[commandDropped.containerId].next(commandDropped);
    }

    moveCommandDroppedListener(commandContainerId: string): Observable<CommandWrapperDTO> {
        this.initializeMoveCommandDroppendSubject(commandContainerId);
        return this.moveCommandDroppedSubjectList[commandContainerId];
    }

    private initializeNewCommandDroppedSubject(commandContainerId: string): void {
        if (this.newCommandDroppedSubjectList[commandContainerId] === undefined) {
            this.newCommandDroppedSubjectList[commandContainerId] = new Subject<CommandWrapperDTO>();
        }
    }

    private initializeMoveCommandDroppendSubject(commandContainerId: string): void {
        if (this.moveCommandDroppedSubjectList[commandContainerId] === undefined) {
            this.moveCommandDroppedSubjectList[commandContainerId] = new Subject<CommandWrapperDTO>();
        }
    }


}