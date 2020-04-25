import { UnitToCreateOnBuildingDTO } from '../model/unit-to-create-on-building.dto';

export abstract class UnitsToCreateRepositoryService {

    abstract save(unitToCreate: UnitToCreateOnBuildingDTO): void;

    abstract getAll(): UnitToCreateOnBuildingDTO[];

    abstract remove(unitToCreate: UnitToCreateOnBuildingDTO): void;

}