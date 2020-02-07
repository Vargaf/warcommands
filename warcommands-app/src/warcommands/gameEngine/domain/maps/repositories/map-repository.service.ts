import { MapEntity } from '../model/map.entity';

export abstract class MapRepository {

    abstract saveMap(map: MapEntity): void;

}
