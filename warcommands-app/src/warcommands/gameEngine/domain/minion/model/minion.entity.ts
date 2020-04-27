import { UnitGenericDTO } from '../../units/model/unit-generic.dto';
import { UnitTypeENUM } from '../../units/model/unit-type.enum';

export interface MinionEntity extends UnitGenericDTO {
    type: UnitTypeENUM.Minion
}
