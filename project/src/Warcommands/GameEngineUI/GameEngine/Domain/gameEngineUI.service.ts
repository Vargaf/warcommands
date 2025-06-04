import { injectable } from 'inversify';
import { GameMap } from "../../GameService/Domain/model/gameMap.ts";

@injectable()
export abstract class GameEngineUIService {
    abstract initializeScene(): void;
    abstract drawMap(map: GameMap): void;
}