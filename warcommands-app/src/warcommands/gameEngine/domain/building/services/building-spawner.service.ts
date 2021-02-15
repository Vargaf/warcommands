import { SpawnerBuildingDTO } from '../model/building.dto';
import { UnitTypeENUM } from '../../units/model/unit-type.enum';
import { ResourcesDTO } from '../../share/reources.dto';
import { UnitGenericDTO } from '../../units/model/unit-generic.dto';

export abstract class BuildingSpawnerService {

    abstract getUnitCost(unitType: UnitTypeENUM): ResourcesDTO;

    abstract hasSpawnerBuildingQueueRoom(building: SpawnerBuildingDTO): boolean;

    abstract createUnit(spawnerBuilding: SpawnerBuildingDTO): UnitGenericDTO;

    abstract isSpawnerBuildingAlreadySpawning(building: SpawnerBuildingDTO): boolean;

    abstract startUnitSpawning(building: SpawnerBuildingDTO, unit: UnitGenericDTO, currentTimeFrame: number): SpawnerBuildingDTO;

    abstract addUnitToSpawningQueue(building: SpawnerBuildingDTO, unit: UnitGenericDTO): SpawnerBuildingDTO;

    abstract spawnNexUnitInQueue(building: SpawnerBuildingDTO, currentTimeFrame: number): UnitGenericDTO;

}