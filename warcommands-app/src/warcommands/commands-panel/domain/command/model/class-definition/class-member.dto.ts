import { ClassNameENUM } from './class-name.enum';

export interface ClassMemberDTO {
    returnClassName: ClassNameENUM | null;
    className: ClassNameENUM;
    memberName: string;
    args?: any[];
    methodChained?: ClassMemberDTO;
}