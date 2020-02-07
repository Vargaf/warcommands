import { MapRepository } from 'src/warcommands/gameEngine/domain/maps/repositories/map-repository.service';
import { MapEntity } from 'src/warcommands/gameEngine/domain/maps/model/map.entity';

export class MapRepositoryService implements MapRepository {

    private map: MapEntity;

    saveMap(map: MapEntity): void {
        this.map = map;
    }

}
