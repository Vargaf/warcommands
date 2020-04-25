import { BaseBuildingSpawnerService } from '../../building/base/base-building-spawner.service';
import { UnitTypeENUM } from '../../units/model/unit-type.enum';
import { BuildingSpawnerService } from '../../building/services/building-spawner.service';

export class BuildingSpawnerServiceFactory {

    constructor(
        private readonly baseBuildingSpawnerService: BaseBuildingSpawnerService
    ) {}

    getBuildingSpawnerService(unitType: UnitTypeENUM): BuildingSpawnerService {

        let service: BuildingSpawnerService = null;

        switch (unitType) {
            case UnitTypeENUM.Minion: {
                service = this.baseBuildingSpawnerService;
                break;
            }
            default: {
                throw new Error("Unit not known: " + unitType);
            }
        }

        return service;
    }

}