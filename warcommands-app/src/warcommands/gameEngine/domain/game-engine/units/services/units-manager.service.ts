import { UnitTypeENUM } from '../model/unit-type.enum';
import { UnitMinionDTO } from '../minion/unit-minion.dto';
import { v4 as uuid } from 'uuid';
import { BaseBuildingDTO } from '../../../building/base/base-building.dto';
import { BuildingsRepositoryService } from '../../../building/services/buildings-repository.service';
import { UnitsRepositoryService } from './units-repository.service';

export class UnitsManagerService {

    constructor(
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly unitsRepositoryService: UnitsRepositoryService
    ) {}

    createUnit(unitType: UnitTypeENUM, spawner: BaseBuildingDTO): void {

        const base: BaseBuildingDTO = (this.buildingsRepositoryService.findById(spawner.id) as BaseBuildingDTO);
        const minionMatterCost = 50;
        const minionEnergyCost = 10;

        if(base.resources.matter >= minionMatterCost && base.resources.energy >= minionEnergyCost) {
            const minnion: UnitMinionDTO = {
                id: uuid(),
                playerId: spawner.playerId,
                baseId: spawner.id,
                type: UnitTypeENUM.Minion,
                size: {
                    height: 1,
                    width: 1
                },
                attributes: {
                    armor: 10,
                    fire: 10,
                    speed: 10,
                    hitPoints: 100
                },
                xCoordinate: spawner.xCoordinate + spawner.spawnRelativeCoordinates.xCoordinate,
                yCoordinate: spawner.yCoordinate + spawner.spawnRelativeCoordinates.yCoordinate
            };

            base.resources.matter -= minionMatterCost;
            base.resources.energy -= minionEnergyCost;

            this.buildingsRepositoryService.save(base);
            this.unitsRepositoryService.save(minnion);

            console.log(minnion);
        }
        

    }

}