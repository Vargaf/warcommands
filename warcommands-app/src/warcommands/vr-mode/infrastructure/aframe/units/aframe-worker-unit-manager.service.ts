import { UnitGenericDTO } from "src/warcommands/game-middleware/model/unit/unit-generic.dto";
import { BuildingsRepositoryInterface } from "src/warcommands/vr-mode/domain/buildings/service/buildings-repository.interface";
import { WorkerUnitManagerInterface } from "src/warcommands/vr-mode/domain/units/services/worker-unit-manager.interface";
import { AFrameComponentNameListENUM } from "../components/aframe-component-name-list.enum";
import { AFramePausableContentService } from "../game-engine/aframe-pausable-content.service";


export class AFrameWorkerUnitManagerService implements WorkerUnitManagerInterface {
    
    private workerComponentList: Map<string, any> = new Map();

    constructor(
        private readonly pausableContentService: AFramePausableContentService,
        private readonly buildingsRepository: BuildingsRepositoryInterface,
    ) {}
    
    addWorker(worker: UnitGenericDTO): void {
        const spawningWorkerComponent = this.workerComponentList.get(worker.id);
        spawningWorkerComponent.removeAttribute(AFrameComponentNameListENUM.Worker, 'worker');
        spawningWorkerComponent.removeAttribute('position');
        this.pausableContentService.returnWorkerToPool(spawningWorkerComponent);

        const workerComponent = this.pausableContentService.getWorkerFromPool();
        workerComponent.setAttribute(AFrameComponentNameListENUM.Worker, { 'worker': worker });
        workerComponent.setAttribute(AFrameComponentNameListENUM.PlayerColor, { 'playerId': worker.playerId });
        workerComponent.setAttribute(AFrameComponentNameListENUM.Worker, { isJustSpawned: true });
        workerComponent.play();
        this.workerComponentList.set(worker.id, workerComponent);
    }

    updateWorker(worker: UnitGenericDTO): void {
        const workerComponent = this.workerComponentList.get(worker.id);
        workerComponent.setAttribute(AFrameComponentNameListENUM.Worker, { 'worker': worker });
    }

    wokerSpawning(worker: UnitGenericDTO): void {
        const base = this.buildingsRepository.findOneById(worker.spawnerBuildingId);

        const workerComponent = this.pausableContentService.getWorkerFromPool();
        workerComponent.setAttribute(AFrameComponentNameListENUM.Worker, { 'worker': worker });
        workerComponent.setAttribute(AFrameComponentNameListENUM.PlayerColor, { 'playerId': worker.playerId });
        workerComponent.setAttribute('position', { x: base.xCoordinate + 1, y: 1.375, z: base.yCoordinate + 1 });
        workerComponent.play();
        this.workerComponentList.set(worker.id, workerComponent);
    }
}