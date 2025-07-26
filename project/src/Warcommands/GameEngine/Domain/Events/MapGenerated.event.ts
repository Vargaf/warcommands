import { EventInterface } from "./Event.interface";
import { EventType } from "./EventType.enum";
import {HexTileDTO} from "../Model/HexTile.dto.ts";

export class MapGeneratedEvent implements EventInterface {
    topic: EventType = EventType.MapGenerated;

    constructor(private readonly _data: HexTileDTO[]) {}

    get data(): HexTileDTO[] {
        return this._data;
    }
}