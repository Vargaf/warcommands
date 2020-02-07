import { MapRepository } from '../repositories/map-repository.service';
import { MapPathfindingGridRepository } from '../repositories/map-pathfinding-grid-repository.service';
import { MapEntity } from '../model/map.entity';
import { MapInterface } from 'src/warcommands/gameEngine/interfaces/model/map/map.interface';
import { MapToResponseTranslatorService } from './map-to-response-translator.service';
import { MapPathfindingGrid } from '../model/map-pathfinding-grid.entity';
import { MapPathFindingGridGenerator } from './map-pathfinding-grid-generator.service';
import { MapConfiguration } from '../model/map-configuration.interface';
import { MapGeneratorService } from './map-generator.service';

export class MapEngineService {

    constructor(
        private mapRepository: MapRepository,
        private mapPathfindingGridRepository: MapPathfindingGridRepository,
        private mapGeneratorService: MapGeneratorService
    ) {}

    generateMap(mapConfiguration: MapConfiguration): MapInterface {

        const map: MapEntity = this.mapGeneratorService.generateMap(mapConfiguration);
        const mapResponse: MapInterface = MapToResponseTranslatorService.translsate(map);
        const mapPathfindingGrid: MapPathfindingGrid = MapPathFindingGridGenerator.generateGrid(map);

        this.mapRepository.saveMap(map);
        this.mapPathfindingGridRepository.saveGrid(mapPathfindingGrid);

        return mapResponse;
    }

}
