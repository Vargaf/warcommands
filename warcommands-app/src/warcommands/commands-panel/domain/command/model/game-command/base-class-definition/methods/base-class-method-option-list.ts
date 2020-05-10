import { BaseClassCreateWorkerMethodOption } from './base-class-create-worker-method-option';
import { ClassMemberOptionDTO } from '../../../class-definition/class-member-option.dto';
import { BaseClassGetWorkersMethodOption } from './base-class-get-workers-method-option';

export const BaseClassMethodOptionList: ClassMemberOptionDTO[] = [
    BaseClassCreateWorkerMethodOption,
    BaseClassGetWorkersMethodOption,
];
