import { UnitTypeENUM } from './unit-type.enum';

export interface UnitToCreateOnBuildoingDTO {
    buildingId: string;
    unitTyp: UnitTypeENUM;
}