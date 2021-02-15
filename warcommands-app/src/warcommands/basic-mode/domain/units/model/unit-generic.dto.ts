import { CoordinatesEntity } from '../../share/model/coordinates.entity';
import { UnitTypeENUM } from '../unit-type.enum';
import { UnitActionGenericDTO } from './unit-action-generic.dto';

export interface UnitGenericDTO extends CoordinatesEntity {
    id: string;
    playerId: string;
    baseId: string;
    spawnerBuildingId: string;
    type: UnitTypeENUM;
    action: UnitActionGenericDTO,
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