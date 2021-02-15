import { ClassMemberDTO } from './class-definition/class-member.dto';
import { EventEmitter } from '@angular/core';

export interface ClassMemberComponent {

    classMember: ClassMemberDTO;
    classMemberChange: EventEmitter<ClassMemberDTO>;
    commandId: string;

}