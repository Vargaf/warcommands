import { ClassMemberOptionDTO } from './class-member-option.dto';

export interface ClassOptionDefinition {
    methods: ClassMemberOptionDTO[],
    properties: ClassMemberOptionDTO[]
}
