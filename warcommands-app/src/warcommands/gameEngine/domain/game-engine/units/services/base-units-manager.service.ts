import { BuildingsRepositoryService } from '../../../building/services/buildings-repository.service';
import { BaseBuildingDTO } from '../../../building/base/base-building.dto';
import { MinionConfiguration } from '../minion/minion-configuration';
import { UnitMinionDTO } from '../minion/unit-minion.dto';
import { v4 as uuid } from 'uuid';
import { UnitTypeENUM } from '../model/unit-type.enum';
import { GameEventBusService } from '../../../game-event-bus/services/game-event-bus.service';
import { BaseSpawningUnitEvent } from '../events/base-spawning-unit.event';
import { BaseQueueingUnitEvent } from '../events/base-queueing-unit.event';

export class BaseUnitsManagerService {

    constructor(
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly gameEventBusService: GameEventBusService,
    ) {}

    createMinion(baseId: string): void {
        let base: BaseBuildingDTO = (this.buildingsRepositoryService.findById(baseId) as BaseBuildingDTO);
        const minionMatterCost = MinionConfiguration.cost.matter;
        const minionEnergyCost = MinionConfiguration.cost.energy;
        const thereIsRoomCreateUnit = this.thereIsRoomCreateUnit(base);

        if(thereIsRoomCreateUnit && base.resources.matter >= minionMatterCost && base.resources.energy >= minionEnergyCost) {
            const minion: UnitMinionDTO = {
                id: uuid(),
                playerId: base.playerId,
                buildingId: base.id,
                type: UnitTypeENUM.Minion,
                size: {
                    height: 1,
                    width: 1
                },
                attributes: {
                    armor: MinionConfiguration.attributes.armor,
                    fire: MinionConfiguration.attributes.fire,
                    speed: MinionConfiguration.attributes.speed,
                    hitPoints: MinionConfiguration.attributes.hitPoints
                },
                xCoordinate: base.xCoordinate + base.spawnRelativeCoordinates.xCoordinate,
                yCoordinate: base.yCoordinate + base.spawnRelativeCoordinates.yCoordinate
            };

            base.resources.matter -= minionMatterCost;
            base.resources.energy -= minionEnergyCost;

            base = this.addUnitToQueue(base, minion);
            this.buildingsRepositoryService.save(base);
        }
    }

    private addUnitToQueue(base: BaseBuildingDTO, unit: UnitMinionDTO): BaseBuildingDTO {
        if(!this.isBaseAlreadySpawning(base)) {
            base.unitSpawning.unit = unit;
            base.unitSpawning.spawnStart = (performance || Date ).now();
            base.unitSpawning.spawnFinish = base.unitSpawning.spawnStart + MinionConfiguration.spawnTime;

            const event: BaseSpawningUnitEvent = new BaseSpawningUnitEvent(unit, base.unitSpawning.spawnFinish, base.unitSpawning.spawnStart);
            this.gameEventBusService.cast(event);
        } else {
            base.queueList.push(unit);
            const event: BaseQueueingUnitEvent = new BaseQueueingUnitEvent(base, unit);
            this.gameEventBusService.cast(event);
        }

        return base;
    }

    private isBaseAlreadySpawning(base: BaseBuildingDTO): boolean {
        return base.unitSpawning.unit !== null;
    }

    private thereIsRoomCreateUnit(base: BaseBuildingDTO): boolean {
        return base.queueList.length < 3;
    }

}