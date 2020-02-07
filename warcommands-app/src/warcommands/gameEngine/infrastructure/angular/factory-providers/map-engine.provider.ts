import { MapEngineService } from 'src/warcommands/gameEngine/domain/maps/services/map-engine.service';
import { MapRepository } from 'src/warcommands/gameEngine/domain/maps/repositories/map-repository.service';
import { MapPathfindingGridRepository } from 'src/warcommands/gameEngine/domain/maps/repositories/map-pathfinding-grid-repository.service';
import { MapRepositoryService } from '../../memory-repository/map/map-repository.service';
import { MapPathfindingGridRepositoryService } from '../../memory-repository/map/map-pathfinding-grid-repository.service';
import { MapGeneratorService } from 'src/warcommands/gameEngine/domain/maps/services/map-generator.service';

const factory = (
    mapRepository: MapRepository,
    mapPathfindingGridRepository: MapPathfindingGridRepository,
    mapGeneratorService: MapGeneratorService
    ) => {
    return new MapEngineService(mapRepository, mapPathfindingGridRepository, mapGeneratorService);
};

export const provider = {
    provide: MapEngineService,
    useFactory: factory,
    deps: [
        MapRepositoryService,
        MapPathfindingGridRepositoryService,
        MapGeneratorService
    ]
};
