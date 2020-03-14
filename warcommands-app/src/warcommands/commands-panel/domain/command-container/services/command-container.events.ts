import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CommandContainerDTO } from '../model/command-container.dto';

@Injectable({
    providedIn: 'root'
})
export class CommandContainerEvents {

    private readonly commandContainerLoadedSubject: Subject<CommandContainerDTO>;

    constructor() {
        this.commandContainerLoadedSubject = new Subject<CommandContainerDTO>();
    }

    commandContainerLoadedDispatch(commandContainer: CommandContainerDTO): void {
        this.commandContainerLoadedSubject.next(commandContainer);
    }

    commandContainerLoadedListener(): Observable<CommandContainerDTO> {
        return this.commandContainerLoadedSubject;
    }


}