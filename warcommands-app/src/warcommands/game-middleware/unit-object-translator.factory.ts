import { UnitGenericDTO as ResponseUnitGenericDTO } from '../gameEngine/domain/units/model/unit-generic.dto';
import { UnitGenericDTO } from './model/unit/unit-generic.dto';
import { UnitTypeENUM } from './model/unit/unit-type.enum';
import { WorkerUnitDTO as ResponseWorkerUnitDTO } from '../gameEngine/domain/units/worker/worker-unit.dto';
import { WorkerUnitDTO } from './model/unit/worker-unit.dto';
import { GameLogicActionVoidCreator } from './model/game-logic-actions/game-logic-action-void.dto';

export class UnitObjectTranslatorFactory {

    static translateUnitType(responseUnit: ResponseUnitGenericDTO): UnitGenericDTO {

        let unit!: UnitGenericDTO;

        switch (responseUnit.type) {
            case UnitTypeENUM.Worker: {
                unit = UnitObjectTranslatorFactory.translateWorkerUnit(<ResponseWorkerUnitDTO>responseUnit);
                break;
            }
            default: {
                throw new Error('The unit to translate does not exists: ' + responseUnit.type);
            }
        }

        return unit;

    }

    static translateUnitListType(responseUnitList: ResponseUnitGenericDTO[]): UnitGenericDTO[] {
        const unitList: UnitGenericDTO[] = [];

        for(let responseUnit of responseUnitList) {
            unitList.push(UnitObjectTranslatorFactory.translateUnitType(responseUnit));
        }

        return unitList;
    }

    private static translateWorkerUnit(responseWorker: ResponseWorkerUnitDTO): WorkerUnitDTO {
        const worker: WorkerUnitDTO = {
            id: responseWorker.id,
            playerId: responseWorker.playerId,
            baseId: responseWorker.baseId,
            spawnerBuildingId: responseWorker.spawnerBuildingId,
            spawningStatus: responseWorker.spawningStatus,
            type: UnitTypeENUM.Worker,
            action: GameLogicActionVoidCreator.create(),
            size: {
                height: responseWorker.size.height,
                width: responseWorker.size.width
            },
            attributes: {
                armor: responseWorker.attributes.armor,
                fire: responseWorker.attributes.fire,
                speed: responseWorker.attributes.speed,
                hitPoints: responseWorker.attributes.hitPoints
            },
            role: responseWorker.role,
            buildingSpeed: responseWorker.buildingSpeed,
            harvestingSpeeds: {
                energy: responseWorker.harvestingSpeeds.energy,
                matter: responseWorker.harvestingSpeeds.matter
            },
            deliveringSpeeds: {
                energy: responseWorker.deliveringSpeeds.energy,
                matter: responseWorker.deliveringSpeeds.matter
            },
            maxCargo: {
                energy: responseWorker.maxCargo.energy,
                matter: responseWorker.maxCargo.matter
            },
            currentCargo: {
                energy: responseWorker.currentCargo.energy,
                matter: responseWorker.currentCargo.matter
            },
            xCoordinate: responseWorker.xCoordinate,
            yCoordinate: responseWorker.yCoordinate
        }

        return worker;
    }
}