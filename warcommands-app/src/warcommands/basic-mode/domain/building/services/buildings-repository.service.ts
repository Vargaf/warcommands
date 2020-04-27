import { BuildingDTO } from '../model/building.dto';
import { UnitGenericDTO } from '../../units/unit-generic.dto';

export abstract class BuildingsRepositoryService {

    abstract save(building: BuildingDTO): void;

    abstract findById(buildingId: string): BuildingDTO;

    abstract remove(building: BuildingDTO): void;

    abstract addUnitToQueue(unit: UnitGenericDTO): void;

    abstract removeUnitFromQueue(unit: UnitGenericDTO): void;

}