import { UnitGenericDTO } from "src/warcommands/game-middleware/model/unit/unit-generic.dto";
import { WorkerUnitManagerInterface } from "src/warcommands/vr-mode/domain/units/services/worker-unit-manager.interface";
import { AFramePausableContentService } from "../game-engine/aframe-pausable-content.service";

export class AFrameWorkerUnitManagerService implements WorkerUnitManagerInterface {
    
    constructor(
        private readonly pausableContentService: AFramePausableContentService
    ) {}

    addWorker(unit: UnitGenericDTO): void {
        const worker = this.pausableContentService.getWorkerFromPool();

        worker.addEventListener('object3dset', (event:any) => {
            worker.setAttribute('worker-unit-component', { 'worker': unit });
        });

        worker.setAttribute('position', { x: unit.xCoordinate, y:0, z: unit.yCoordinate });
    }
}