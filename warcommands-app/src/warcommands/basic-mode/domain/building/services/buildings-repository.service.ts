import { BuildingDTO } from '../model/building.dto';
import { UnitGenericDTO } from '../../units/model/unit-generic.dto';
import { ResourcesDTO } from '../../share/model/resources.dto';
import { QueryFilterDTO } from '../../share/model/query-filter.dto';

export abstract class BuildingsRepositoryService {

    abstract save(building: BuildingDTO): void;

    abstract findById(buildingId: string): BuildingDTO;

    abstract findBy(filterList: QueryFilterDTO): BuildingDTO[];

    abstract remove(building: BuildingDTO): void;

    abstract addUnitToQueue(unit: UnitGenericDTO): void;

    abstract removeUnitFromQueue(unit: UnitGenericDTO): void;

    abstract updateBaseResources(baseId: string, resources: ResourcesDTO): void;

}