import { WorkerUnitDTO } from '../../../units/worker/worker-unit.dto';
import { WorkerUnitRoleENUM } from '../../../units/worker/worker-unit-role.enum';
import { UnitsRepositoryService } from '../../../units/services/units-repository.service';
import { GameLogicActionsManagerService } from '../../../game-engine/sevices/game-logic-actions-manager.service';


export class WorkerSetRoleManagerService {

    constructor(
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly gameLogicActionsManager: GameLogicActionsManagerService,
    ) {}

    changeRole(unit: WorkerUnitDTO, role: WorkerUnitRoleENUM): WorkerUnitDTO {
        
        if(unit.role !== role) {
            if(unit.actionId) {
                unit = <WorkerUnitDTO>this.gameLogicActionsManager.removeUnitAction(unit);
            }
            
            unit.role = role;
            this.unitsRepositoryService.save(unit);
        }
        
        return unit;
    }
}