import { UnitGenericDTO } from '../model/unit-generic.dto';
import { UnitTypeENUM } from '../model/unit-type.enum';

export abstract class UnitsRepositoryService {

    abstract save(unit: UnitGenericDTO): void;

    abstract findById(unitId: string): UnitGenericDTO;

    abstract findByTypeAndPlayer(unitType: UnitTypeENUM, playerId: string): UnitGenericDTO[];

    abstract remove(unit: UnitGenericDTO): void;

}