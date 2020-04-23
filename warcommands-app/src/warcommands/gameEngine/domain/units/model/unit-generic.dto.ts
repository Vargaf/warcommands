import { CoordinatesEntity } from '../../maps/model/coordinates.entity';
import { UnitTypeENUM } from './unit-type.enum';

export interface UnitGenericDTO extends CoordinatesEntity {
    id: string;
    playerId: string;
    buildingId: string;
    type: UnitTypeENUM;
    size: {
        height: number,
        width: number
    },
    attributes: {
        armor: number,
        fire: number,
        speed: number,
        hitPoints: number
    }
}