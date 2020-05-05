import { UnitActionGenericDTO } from './unit-action-generic.dto';
import { UnitSuperActionStatusENUM } from './unit-super-action-status.enum';

export interface UnitSuperActionDTO {
    unitId: string;
    currentAtomicActionIndex: number;
    atomicActions: UnitActionGenericDTO[];
    status: UnitSuperActionStatusENUM;
}