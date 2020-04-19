import { BuildingDTO } from '../model/building.dto';
import { MapConfiguration } from '../../maps/model/map-configuration.interface';
import { BuildingCreatedEventFactoryService } from './building-created-event-factory.service';
import { BuildingsRepositoryService } from './buildings-repository.service';
import { SpawingBuildingsRepositoryservice } from './spawning-buildings-repository.service';
import { MapBlockedTilesManagerService } from '../../maps/services/map-blocked-tiles-manager.service';

export class BuildingsManagerService {

    constructor(
        private readonly buildingCreatedEventFactoryService: BuildingCreatedEventFactoryService,
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly spawningBuildngsRepositoryService: SpawingBuildingsRepositoryservice,
        private readonly mapBlockedTilesManagerService: MapBlockedTilesManagerService
    ) {}

    initializeFromMap(map: MapConfiguration): void {
        this.mapBlockedTilesManagerService.initializeFromMap(map);
    }

    addBuilding(building: BuildingDTO): void {
        this.mapBlockedTilesManagerService.blockTilesFromBuilding(building);

        this.buildingsRepositoryService.save(building);
        this.buildingCreatedEventFactoryService.cast(building);
    }

    addSpawningBuildingId(buildingId: string): void {
        this.spawningBuildngsRepositoryService.save(buildingId);
    }

}