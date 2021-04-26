import { UnitActionGenericDTO } from './unit-action-generic.dto';
import { UnitActionTypeENUM } from './unit-action-type.enum';
import { PathCoordinate } from './path-coordinate.dto';
import { CoordinatesEntity } from '../map/coordinates.entity';

export interface UnitActionMoveToDTO extends UnitActionGenericDTO {
    type: UnitActionTypeENUM.MoveTo;
    data: {
        from: CoordinatesEntity,
        to: CoordinatesEntity,
        path: PathCoordinate[]
    }
}