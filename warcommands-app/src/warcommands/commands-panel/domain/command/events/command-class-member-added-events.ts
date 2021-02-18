import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';
import { ClassMemberDTO } from '../model/class-definition/class-member.dto';
import { CommandClassMemberAddedEventDTO } from './command-class-member-added-event.dto';

@Injectable({
    providedIn: 'root'
})
export class CommandClassMemberAddedEvents {

    private readonly commandClassMemberAddedSubjectList: Subject<CommandClassMemberAddedEventDTO> =
        new Subject<CommandClassMemberAddedEventDTO>();

    commandClassMemberAddedDispatch(commandId: string, classMember: ClassMemberDTO | null): void {
        const event: CommandClassMemberAddedEventDTO = {
            commandId,
            classMember: <ClassMemberDTO>classMember
        }
        this.commandClassMemberAddedSubjectList.next(event);
    }

    commandClassMemberAddedListener(): Observable<CommandClassMemberAddedEventDTO> {
        return this.commandClassMemberAddedSubjectList;
    }

}