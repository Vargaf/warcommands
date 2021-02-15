import { UnitGenericDTO } from '../model/unit-generic.dto';
import { UnitTypeENUM } from '../model/unit-type.enum';
import { QueryFilterDTO } from '../../share/query-filter.dto';

export abstract class UnitsRepositoryService {

    abstract save(unit: UnitGenericDTO): void;

    abstract findById(unitId: string): UnitGenericDTO;

    abstract findByType(unitType: UnitTypeENUM): UnitGenericDTO[];

    abstract findByTypeAndPlayer(unitType: UnitTypeENUM, playerId: string): UnitGenericDTO[];

    abstract remove(unit: UnitGenericDTO): void;

    abstract getAll(): UnitGenericDTO[];

    abstract findBy(filterList: QueryFilterDTO): UnitGenericDTO[];

} 