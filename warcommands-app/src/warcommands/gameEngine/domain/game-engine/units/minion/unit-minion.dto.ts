import { UnitGenericDTO } from '../model/unit-generic.dto';
import { UnitTypeENUM } from '../model/unit-type.enum';

export interface UnitMinionDTO extends UnitGenericDTO {
    type: UnitTypeENUM.Minion;
}