import { UnitGenericDTO } from "src/warcommands/game-middleware/model/unit/unit-generic.dto";
import { WorkerUnitManagerInterface } from "src/warcommands/vr-mode/domain/units/services/worker-unit-manager.interface";
import { AFramePausableContentService } from "../game-engine/aframe-pausable-content.service";


export class AFrameWorkerUnitManagerService implements WorkerUnitManagerInterface {
    
    private workerComponentList: Map<string, any> = new Map();

    constructor(
        private readonly pausableContentService: AFramePausableContentService
    ) {}
    
    addWorker(worker: UnitGenericDTO): void {
        const workerComponent = this.pausableContentService.getWorkerFromPool();
        workerComponent.setAttribute('worker-unit-component', { 'worker': worker });
        workerComponent.play();
        this.workerComponentList.set(worker.id, workerComponent);
    }

    updateWorker(worker: UnitGenericDTO): void {
        const workerComponent = this.workerComponentList.get(worker.id);
        workerComponent.setAttribute('worker-unit-component', { 'worker': worker });
    }
}