import { CoordinatesEntity } from '../../maps/model/coordinates.entity';
import { UnitTypeENUM } from './unit-type.enum';
import { UnitSpawningStatusENUM } from './unit-spawning-status.enum';

export interface UnitGenericDTO extends CoordinatesEntity {
    id: string;
    playerId: string;
    baseId: string;
    spawnerBuildingId: string;
    spawningStatus: UnitSpawningStatusENUM;
    type: UnitTypeENUM;
    actionId: string,
    size: {
        height: number,
        width: number
    },
    attributes: {
        armor: number,
        fire: number,
        speed: number,
        hitPoints: number
    },
}