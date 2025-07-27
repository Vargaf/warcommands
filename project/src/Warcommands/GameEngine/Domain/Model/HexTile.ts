import {HexTileCoordinates} from "./HexTileCoordinates.ts";
import {TileType} from "./tileType.enum.ts";
import {HexTileDTO} from "./HexTile.dto.ts";

export class HexTile {

    private readonly _coordinates: HexTileCoordinates;
    private readonly _terrain: TileType;
    private _height: number = 0;

    constructor(hexTileDTO: HexTileDTO) {
        this._coordinates = new HexTileCoordinates(hexTileDTO.coordinates.q, hexTileDTO.coordinates.r, hexTileDTO.coordinates.s);

        if(hexTileDTO.terrain == undefined) {
            throw new Error("Invalid hexTileDTO.terrain");
        }
        this._terrain = hexTileDTO.terrain;
        this.height
    }

    get coordinates(): HexTileCoordinates {
        return this._coordinates;
    }

    get terrain(): TileType {
        return this._terrain;
    }

    get height(): number {
        return this._height;
    }
}