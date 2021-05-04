import { UnitGenericDTO } from "src/warcommands/game-middleware/model/unit/unit-generic.dto";
import { UnitFilterDTO } from "../model/unit-filter.dto";

export abstract class UnitsRepositoryInterface {

    abstract save(unit: UnitGenericDTO): void;

    abstract findBy(filter: UnitFilterDTO): UnitGenericDTO[];

    abstract findById(unitId: string): UnitGenericDTO;

}