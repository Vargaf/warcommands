import {HexTileCoordinates} from "./HexTileCoordinates.ts";
import {TileType} from "./tileType.enum.ts";

export interface HexTileDTO {
    coordinates: HexTileCoordinates;
    terrain: TileType;
    height: number;
}