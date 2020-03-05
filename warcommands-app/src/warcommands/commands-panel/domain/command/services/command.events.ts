import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { GenericCommandDTO } from '../model/generic-command.dto';
import { CommandAddedEventDTO } from '../model/command-added-event.dto';

@Injectable({
    providedIn: 'root'
})
export class CommandEvents {

    private readonly commandLoadedSubject: Subject<CommandAddedEventDTO>;

    constructor() {
        this.commandLoadedSubject = new Subject<CommandAddedEventDTO>();
    }

    commandLoadedDispatch(command: GenericCommandDTO, position: number): void {
        this.commandLoadedSubject.next({ command, position });
    }

    commandLoadedListener(): Observable<CommandAddedEventDTO> {
        return this.commandLoadedSubject;
    }

}
