import { ClassMemberDTO } from './class-member.dto';

export interface ClassDefinition {
    methods: ClassMemberDTO[],
    properties: ClassMemberDTO[]
}