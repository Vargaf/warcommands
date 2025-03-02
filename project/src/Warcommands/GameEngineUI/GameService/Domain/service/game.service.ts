import "reflect-metadata";
import { inject, injectable } from 'inversify';
import { GameEngineUIService } from "../../../GameEngine/Domain/gameEngineUI.service.ts";
import { MapService } from "./map.service.ts";

@injectable()
export class GameService {

    constructor(
        @inject(GameEngineUIService) private gameEngine: GameEngineUIService,
        @inject(MapService) private mapService: MapService
        ) {
    }

    public play(): void {
        console.log('Play Game Service');

        this.mapService.initializeMap(5);
        this.gameEngine.drawCube();
        this.gameEngine.drawMap(this.mapService.gameMap())
    }
}