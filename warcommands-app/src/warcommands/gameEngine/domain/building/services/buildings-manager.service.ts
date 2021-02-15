import { BuildingDTO } from '../model/building.dto';
import { MapConfiguration } from '../../maps/model/map-configuration.interface';
import { BuildingsRepositoryService } from './buildings-repository.service';
import { SpawingBuildingsRepositoryservice } from './spawning-buildings-repository.service';
import { MapBlockedTilesManagerService } from '../../maps/services/map-blocked-tiles-manager.service';
import { GameEventBusService } from '../../game-event-bus/services/game-event-bus.service';
import { BuildingCreaedEvent } from '../events/building-created.event';

export class BuildingsManagerService {

    constructor(
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly spawningBuildngsRepositoryService: SpawingBuildingsRepositoryservice,
        private readonly mapBlockedTilesManagerService: MapBlockedTilesManagerService,
        private readonly gameEventBusService: GameEventBusService,
    ) {}

    initializeFromMap(map: MapConfiguration): void {
        this.mapBlockedTilesManagerService.initializeFromMap(map);
    }

    addBuilding(building: BuildingDTO): void {
        this.mapBlockedTilesManagerService.blockTilesFromBuilding(building);
        this.buildingsRepositoryService.save(building);
        
        const buildingCreatedEvent: BuildingCreaedEvent = new BuildingCreaedEvent(building);
        this.gameEventBusService.cast(buildingCreatedEvent);
    }

    addSpawningBuildingId(buildingId: string): void {
        this.spawningBuildngsRepositoryService.save(buildingId);
    }

}