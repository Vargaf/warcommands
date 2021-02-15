import { UnitSuperActionDTO } from './unit-super-action.dto';

export abstract class UnitSuperAcionRepositopriService {

    abstract save(superAction: UnitSuperActionDTO): void;

    abstract findByUnitId(unitId: string): UnitSuperActionDTO;

    abstract remove(superAction: UnitSuperActionDTO): void;

    abstract getAll(): UnitSuperActionDTO[];

    abstract unitHasSuperaction(unitId: string): boolean;

}