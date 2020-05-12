import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { GenericCommandDTO } from '../model/generic-command.dto';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class CommandUpdatedEvents {

    private readonly commandUpdatedSubjectList: Subject<GenericCommandDTO> = new Subject<GenericCommandDTO>();

    commandUpdatedDispatch(command: GenericCommandDTO): void {
        const clone = _.cloneDeep(command);
        this.commandUpdatedSubjectList.next(clone);
    }

    commandCreatedListener(): Observable<GenericCommandDTO> {
        return this.commandUpdatedSubjectList;
    }

}
