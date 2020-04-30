import { GameClassGetBaseByNameMethodOption } from './game-class-get-base-by-name-method-option';
import { ClassMemberOptionDTO } from '../../../class-definition/class-member-option.dto';
import { GameClassGetWorkerMethodOption } from './game-class-get-worker-method-option';

export const GameClassMethodOptionList: ClassMemberOptionDTO[] = [
    GameClassGetBaseByNameMethodOption,
    GameClassGetWorkerMethodOption,
];