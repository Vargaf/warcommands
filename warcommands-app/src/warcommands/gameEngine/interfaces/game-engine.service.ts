import { MinionEntity } from '../domain/minion/model/minion.entity';
import { MapInterface } from './model/map/map.interface';
import { BaseInterface } from './model/base/base.interface';

export abstract class GameEngineService {

    abstract initialize(): void;

    abstract start(): void;

    abstract generateMap(map: MapInterface): void;

    abstract addMinion(minion: MinionEntity): void;

    abstract addBase(base: BaseInterface): void;

}
