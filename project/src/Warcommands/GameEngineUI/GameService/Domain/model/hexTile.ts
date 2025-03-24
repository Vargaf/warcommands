import { HexTileCoordinates } from "./hexTileCoordinates.ts";
import { TileType } from "./tileType.enum.ts";

export class HexTile {

    private readonly coordinates: HexTileCoordinates;
    private _terrain: TileType = TileType.Grass;

    constructor(
        hexCubeCoordinateQ: number,
        hexCubeCoordinateR: number,
        hexCubeCoordinateS: number) {

        this.coordinates = new HexTileCoordinates(hexCubeCoordinateQ, hexCubeCoordinateR, hexCubeCoordinateS);
    }

    getCoordinates(): HexTileCoordinates {
        return this.coordinates;
    }

    setTerrain(tileType: TileType): void {
        this._terrain = tileType;
    }

    terrain(): number {
        return this._terrain;
    }
}