import { MinionEntity } from '../domain/minion/model/minion.entity';

export abstract class GameEngineService {

    abstract initialize(): void;

    abstract addMinion(minion: MinionEntity): void;

    abstract start(): void;


}
