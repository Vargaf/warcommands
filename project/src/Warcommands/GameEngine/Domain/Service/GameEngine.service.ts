import {inject} from "inversify";
import {MapBuilderService} from "./MapBuilder.service.ts";

export class GameEngineService {

    constructor(
        @inject(MapBuilderService) private readonly mapBuilderService: MapBuilderService
    ) {
    }

    start(): void {
        console.log('Starting Game Engine');
        this.mapBuilderService.buildMap(30);
    }
}