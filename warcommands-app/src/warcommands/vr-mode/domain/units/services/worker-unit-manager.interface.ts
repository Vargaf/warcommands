import { UnitGenericDTO } from "src/warcommands/game-middleware/model/unit/unit-generic.dto";

export abstract class WorkerUnitManagerInterface {

    abstract addWorker(worker: UnitGenericDTO): void;

    abstract updateWorker(worker: UnitGenericDTO): void;

    abstract wokerSpawning(worker: UnitGenericDTO): void;

}