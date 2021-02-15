import { BaseClassCreateWorkerMethodOption } from './base-class-create-worker-method-option';
import { ClassMemberOptionDTO } from '../../../class-definition/class-member-option.dto';
import { BaseClassGetWorkerListMethodOption } from './base-class-get-worker-list-method-option';
import { BaseClassGetWorkerMethodOption } from './base-class-get-worker-method-option';

export const BaseClassMethodOptionList: ClassMemberOptionDTO[] = [
    BaseClassCreateWorkerMethodOption,
    BaseClassGetWorkerMethodOption,
    BaseClassGetWorkerListMethodOption,
];
