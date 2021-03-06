import { BuildingSpawnerService } from '../services/building-spawner.service';
import { SpawnerBuildingDTO } from '../model/building.dto';
import { UnitTypeENUM } from '../../units/model/unit-type.enum';
import { ResourcesDTO } from '../../share/reources.dto';
import { WorkerConfiguration } from '../../units/worker/worker-configuration';
import { UnitGenericDTO } from '../../units/model/unit-generic.dto';
import { WorkerUnitDTO } from '../../units/worker/worker-unit.dto';
import { v4 as uuid } from 'uuid';
import { UnitSpawningStatusENUM } from '../../units/model/unit-spawning-status.enum';
import * as _ from 'lodash';

export class BaseBuildingSpawnerService implements BuildingSpawnerService {

    getUnitCost(unitType: UnitTypeENUM): ResourcesDTO {
        let resources!: ResourcesDTO;

        switch(unitType) {
            case UnitTypeENUM.Worker: {
                resources = {
                    matter: WorkerConfiguration.cost.matter,
                    energy: WorkerConfiguration.cost.energy
                }
            }
        }

        return resources;
    }

    hasSpawnerBuildingQueueRoom(building: SpawnerBuildingDTO): boolean {
        return building.queueList.length < 10;
    }

    createUnit(spawnerBuilding: SpawnerBuildingDTO): UnitGenericDTO {
        const worker: WorkerUnitDTO = {
            id: uuid(),
            playerId: <string>spawnerBuilding.playerId,
            baseId: <string>spawnerBuilding.baseId,
            spawnerBuildingId: <string>spawnerBuilding.id,
            spawningStatus: UnitSpawningStatusENUM.Enqueued,
            type: UnitTypeENUM.Worker,
            actionId: '',
            role: null,
            size: {
                height: 1,
                width: 1
            },
            attributes: {
                armor: WorkerConfiguration.attributes.armor,
                fire: WorkerConfiguration.attributes.fire,
                speed: WorkerConfiguration.attributes.speed,
                hitPoints: WorkerConfiguration.attributes.hitPoints
            },
            xCoordinate: spawnerBuilding.xCoordinate + spawnerBuilding.spawnRelativeCoordinates.xCoordinate,
            yCoordinate: spawnerBuilding.yCoordinate + spawnerBuilding.spawnRelativeCoordinates.yCoordinate,
            buildingSpeed: WorkerConfiguration.buildingSpeed,
            harvestingSpeeds: {
                energy: WorkerConfiguration.extractionSpeed.energy,
                matter: WorkerConfiguration.extractionSpeed.matter,
            },
            deliveringSpeeds: {
                energy: WorkerConfiguration.deliverySpeed.energy,
                matter: WorkerConfiguration.deliverySpeed.matter,
            },
            maxCargo: {
                energy: WorkerConfiguration.maxCargo.energy,
                matter: WorkerConfiguration.maxCargo.matter
            },
            currentCargo: {
                energy: 0,
                matter: 0
            }
        };

        return worker;
    }

    isSpawnerBuildingAlreadySpawning(building: SpawnerBuildingDTO): boolean {
        return building.unitSpawning.unit !== null;
    }

    startUnitSpawning(building: SpawnerBuildingDTO, unit: UnitGenericDTO, currentTimeFrame: number): SpawnerBuildingDTO
    {
        building.unitSpawning.unit = unit;
        building.unitSpawning.spawnStart = currentTimeFrame;
        building.unitSpawning.spawnFinish = currentTimeFrame + WorkerConfiguration.spawnTime;

        return building;
    }

    addUnitToSpawningQueue(building: SpawnerBuildingDTO, unit: UnitGenericDTO): SpawnerBuildingDTO
    {
        const unitClone = _.cloneDeep(unit);
        building.queueList.push((unitClone as UnitGenericDTO));
        return building;
    }

    spawnNexUnitInQueue(building: SpawnerBuildingDTO, currentTimeFrame: number): UnitGenericDTO {
        
        const unit: UnitGenericDTO = <UnitGenericDTO>building.queueList.shift();
        building.unitSpawning.unit = unit;
        building.unitSpawning.spawnStart = currentTimeFrame;
        building.unitSpawning.spawnFinish = currentTimeFrame + WorkerConfiguration.spawnTime;

        return unit;
    }

}