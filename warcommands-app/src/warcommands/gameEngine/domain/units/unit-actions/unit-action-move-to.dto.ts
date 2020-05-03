import { UnitActionGenericDTO } from './unit-action-generic.dto';
import { UnitActionTypeENUM } from './unit-action-type.enum';
import { CoordinatesEntity } from '../../maps/model/coordinates.entity';
import { PathFindingCoordinate } from '../../maps/model/path-finding-coordinate.dto';

export interface UnitActionMoveToDTO extends UnitActionGenericDTO {
    type: UnitActionTypeENUM.MoveTo;
    data: {
        from: CoordinatesEntity,
        to: CoordinatesEntity,
        path: PathFindingCoordinate[]
    }
}