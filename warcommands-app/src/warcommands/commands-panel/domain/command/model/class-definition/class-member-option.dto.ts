import { ClassNameENUM } from './class-name.enum';
import { SelectOptionDTO } from './select-option.dto';

export interface ClassMemberOptionDTO extends SelectOptionDTO {
    className: ClassNameENUM;
}
