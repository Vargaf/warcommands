import { GameLogicInitializeWorkerHarvestActionsService } from './game-logic-initialize-worker-harvest-actions.service';
import { UnitsRepositoryService } from '../../../units/services/units-repository.service';
import { UnitTypeENUM } from '../../../units/model/unit-type.enum';
import { WorkerUnitDTO } from '../../../units/worker/worker-unit.dto';
import { UnitSuperAcionRepositopriService } from '../../../units/unit-actions/unit-super-action-repository.service';
import { WorkerUnitRoleENUM } from '../../../units/worker/worker-unit-role.enum';
import { UnitSpawningStatusENUM } from '../../../units/model/unit-spawning-status.enum';

export class GameLogicWorkerActionsManagerService {

    constructor(
        private readonly gameLogicInitializeWorkerHarvestActionsService: GameLogicInitializeWorkerHarvestActionsService,
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly unitSuperActionRepositoryService: UnitSuperAcionRepositopriService,
    ) { }

    initializeWorkerActions(): void {
        const workerList = this.unitsRepositoryService.findByType(UnitTypeENUM.Worker);

        for (const unit of workerList) {
            const worker: WorkerUnitDTO = (unit as WorkerUnitDTO);
            if (this.hasRole(worker) && this.isSpawned(worker)) {
                if (!this.hasSuperaction(worker)) {
                    this.createSuperAction(worker);
                }
            }
        }
    }

    private hasRole(worker: WorkerUnitDTO): boolean {
        return worker.role !== undefined;
    }

    private isSpawned(worker: WorkerUnitDTO): Boolean {
        return worker.spawningStatus === UnitSpawningStatusENUM.Spawned
    }

    private hasSuperaction(worker: WorkerUnitDTO): boolean {
        return this.unitSuperActionRepositoryService.unitHasSuperaction(worker.id);
    }

    private createSuperAction(worker: WorkerUnitDTO): void {
        if (this.hasHarvesterRole(worker)) {
            this.gameLogicInitializeWorkerHarvestActionsService.createHarvesterSuperAction(worker);
        }
    }

    private hasHarvesterRole(worker: WorkerUnitDTO): boolean {
        return worker.role === WorkerUnitRoleENUM.MatterHarvester || worker.role === WorkerUnitRoleENUM.EnergyHarvester;
    }
}