import { MapDTO } from '../model/map.dto';

export abstract class MapRepository {

    abstract saveMap(map: MapDTO): void;

}
