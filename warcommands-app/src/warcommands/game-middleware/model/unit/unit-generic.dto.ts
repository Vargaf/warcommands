import { UnitTypeENUM } from './unit-type.enum';
import { CoordinatesEntity } from '../map/coordinates.entity';
import { UnitActionGenericDTO } from '../unit-action/unit-action-generic.dto';
import { UnitSpawningStatusENUM } from './unit-spawning-status.enum';
import { GameLogicActionDTO } from '../game-logic-actions/game-logic-action.dto';

export interface UnitGenericDTO extends CoordinatesEntity {
    id: string;
    playerId: string;
    baseId: string;
    spawnerBuildingId: string;
    spawningStatus: UnitSpawningStatusENUM;
    type: UnitTypeENUM;
    action: UnitActionGenericDTO | null | GameLogicActionDTO,
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