import { UnitActionGenericDTO } from './unit-action-generic.dto';
import { UnitActionTypeENUM } from './unit-action-type.enum';
import { CoordinatesEntity } from '../../share/model/coordinates.entity';
import { PathCoordinate } from './path-coordinate.dto';

export interface UnitActionMoveToDTO extends UnitActionGenericDTO {
    type: UnitActionTypeENUM.MoveTo;
    data: {
        from: CoordinatesEntity,
        to: CoordinatesEntity,
        path: PathCoordinate[]
    }
}