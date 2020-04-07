import { MapRepository } from 'src/warcommands/gameEngine/domain/maps/repositories/map-repository.service';
import { MapDTO } from 'src/warcommands/gameEngine/domain/maps/model/map.dto';

export class MapRepositoryService implements MapRepository {

    private map: MapDTO;

    saveMap(map: MapDTO): void {
        this.map = map;
    }

}
