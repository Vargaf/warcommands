import { CoordinatesEntity } from '../../maps/model/coordinates.entity';
import { UnitTypeENUM } from './unit-type.enum';
import { UnitActionGenericDTO } from '../unit-actions/unit-action-generic.dto';
import { UnitSpawningStatusENUM } from './unit-spawning-status.enum';
import { GameLogicActionDTO } from '../../game-logic-actions/model/game-logic-action.dto';

export interface UnitGenericDTO extends CoordinatesEntity {
    id: string;
    playerId: string;
    baseId: string;
    spawnerBuildingId: string;
    spawningStatus: UnitSpawningStatusENUM;
    type: UnitTypeENUM;
    action: UnitActionGenericDTO | GameLogicActionDTO | null,
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