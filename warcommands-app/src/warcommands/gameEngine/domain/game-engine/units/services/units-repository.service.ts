import { UnitGenericDTO } from '../model/unit-generic.dto';

export abstract class UnitsRepositoryService {

    abstract save(unit: UnitGenericDTO): void;

    abstract findById(unitId: string): UnitGenericDTO;

    abstract remove(unit: UnitGenericDTO): void;

}