import { UnitTypeENUM } from './unit-type.enum';

export interface UnitToCreateOnBuildingDTO {
    buildingId: string;
    unitType: UnitTypeENUM;
}