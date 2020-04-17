import { UnitTypeENUM } from '../model/unit-type.enum';
import { BuildingsRepositoryService } from '../../../building/services/buildings-repository.service';
import { UnitsRepositoryService } from './units-repository.service';
import { BaseUnitsManagerService } from './base-units-manager.service';

export class UnitsManagerService {

    constructor(
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly baseUnitsManaerService: BaseUnitsManagerService
    ) {}

    createUnit(unitType: UnitTypeENUM, spawner: any): void {

        switch (unitType) {
            case UnitTypeENUM.Minion: {
                this.baseUnitsManaerService.createMinion(spawner.id);
                break;
            }
            default: {
                throw new Error("Wrong unit type to creae: " + unitType);
            }
        }

        
        

    }

}