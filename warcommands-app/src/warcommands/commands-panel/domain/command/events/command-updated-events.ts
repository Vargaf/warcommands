import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { GenericCommandDTO } from '../model/generic-command.dto';

@Injectable({
    providedIn: 'root'
})
export class CommandUpdatedEvents {

    private readonly commandUpdatedSubjectList: Subject<GenericCommandDTO> = new Subject<GenericCommandDTO>();

    commandUpdatedDispatch(command: GenericCommandDTO): void {
        this.commandUpdatedSubjectList.next(command);
    }

    commandCreatedListener(): Observable<GenericCommandDTO> {
        return this.commandUpdatedSubjectList;
    }

}
