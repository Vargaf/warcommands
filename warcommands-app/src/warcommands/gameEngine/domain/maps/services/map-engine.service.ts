import { MapRepository } from '../repositories/map-repository.service';
import { MapDTO } from '../model/map.dto';
import { MapConfiguration } from '../model/map-configuration.interface';
import { MapGeneratorService } from './map-generator.service';
import { GameEventBusService } from '../../game-event-bus/services/game-event-bus.service';
import { GeneratingMapEvent } from '../../game-event-bus/model/map/generating-map.event';
import { MapGeneratedEvent } from '../../game-event-bus/model/map/map-generated.event';
import { PathFindingManagerService } from './path-finding-manager.service';

export class MapEngineService {

    constructor(
        private readonly mapRepository: MapRepository,
        private readonly mapGeneratorService: MapGeneratorService,
        private readonly gameEventBusService: GameEventBusService,
        private readonly pathFindingManagerService: PathFindingManagerService
    ) {}

    generateMap(mapConfiguration: MapConfiguration): MapDTO {

        const generatingMapEvent = new GeneratingMapEvent();
        this.gameEventBusService.cast(generatingMapEvent);

        const mapResponse: MapDTO = this.getMap(mapConfiguration);

        const mapGeneratedEvent = new MapGeneratedEvent(mapResponse);
        this.gameEventBusService.cast(mapGeneratedEvent);

        return mapResponse;
    }

    private getMap(mapConfiguration: MapConfiguration): MapDTO {
        const map: MapDTO = this.mapGeneratorService.generateMap(mapConfiguration);

        this.mapRepository.saveMap(map);
        this.pathFindingManagerService.generateGrid(map);

        return map;
    }

}
