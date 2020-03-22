import { ClassNameENUM } from './class-name.enum';

export interface ClassMemberDTO {
    className: ClassNameENUM;
    memberName: string;
    args?: any[];
    methodChained?: ClassMemberDTO;
}