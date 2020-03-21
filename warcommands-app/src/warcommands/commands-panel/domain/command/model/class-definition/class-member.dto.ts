import { ClassMemberType } from './class-member-type.enum';

export interface ClassMemberDTO {
    type: ClassMemberType;
    value: string;
    label: string;
    label_id: string;
}