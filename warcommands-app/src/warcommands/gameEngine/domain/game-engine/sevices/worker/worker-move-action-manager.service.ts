import { PathFindingManagerService } from '../../../maps/services/path-finding-manager.service';
import { UnitActionMoveToDTO } from '../../../units/unit-actions/unit-action-move-to.dto';
import { UnitActionTypeENUM } from '../../../units/unit-actions/unit-action-type.enum';
import { UnitActionStatusENUM } from '../../../units/unit-actions/unit-action-status.enum';
import * as _ from 'lodash';
import { UnitActionGenericDTO } from '../../../units/unit-actions/unit-action-generic.dto';
import { Observable, Subject } from 'rxjs';
import { v4 as uuid } from 'uuid';


export class WorkerMoveActionManagerService {
    
    constructor(
        private readonly pathFindingManager: PathFindingManagerService,
    ) {}

    moveTo(xFromCoordinate: number, yFromCoordinate: number, xToCoordinate: number, yToCoordinate: number): Observable<UnitActionGenericDTO> {
        const actionSubject: Subject<UnitActionGenericDTO> = new Subject<UnitActionGenericDTO>();
  
            const action: UnitActionMoveToDTO = {
                id: uuid(),
                type: UnitActionTypeENUM.MoveTo,
                actionStatus: UnitActionStatusENUM.WaitingToStart,
                data: {
                    from: {
                        xCoordinate: xFromCoordinate,
                        yCoordinate: yFromCoordinate
                    },
                    to: {
                        xCoordinate: xToCoordinate,
                        yCoordinate: yToCoordinate
                    },
                    path: [],
                    currentPathStep: 0
                }
            }

            this.pathFindingManager.findPath(action).subscribe((path) => {
                action.data.path = path;
                actionSubject.next(action);
                
            });
        
        return actionSubject;
    }

}