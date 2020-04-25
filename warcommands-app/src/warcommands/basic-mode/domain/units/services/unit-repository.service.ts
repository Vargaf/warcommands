import { UnitGenericDTO } from '../unit-generic.dto';

export abstract class UnitRepositoryService {

    abstract save(unit: UnitGenericDTO): void;

    abstract findById(unitId: string): UnitGenericDTO;

    abstract remove(unit: UnitGenericDTO): void;

}