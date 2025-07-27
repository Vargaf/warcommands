import {TileType} from "./tileType.enum.ts";
import {HexTileCoordinates} from "./HexTileCoordinates.ts";
import {HexTileDTO} from "./HexTile.dto.ts";
import {MathUtils} from "three";


export class HexTile {

    private readonly _coordinates: HexTileCoordinates;
    private readonly _terrain: TileType;
    private _color: string = '';
    private _height: number = 0;

    constructor(hexTileDTO: HexTileDTO) {
        this._coordinates = new HexTileCoordinates(hexTileDTO.coordinates.q, hexTileDTO.coordinates.r, hexTileDTO.coordinates.s);

        if(hexTileDTO.terrain == undefined) {
            throw new Error("Invalid hexTileDTO.terrain");
        }
        this._terrain = hexTileDTO.terrain;
        this.assignColorByTerrain(hexTileDTO.terrain);
        this._height = hexTileDTO.height;
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

    get color(): string {
        return this._color;
    }

    private assignColorByTerrain(tileType: TileType): void {

        switch (tileType) {
            case TileType.Grass:
                this._color = `hsl(120, 100%, ${MathUtils.randFloat(30, 35) }%)`;
                break;
            case TileType.Water:
                this._color = `hsl(240, 100%, ${MathUtils.randFloat(30, 35) }%)`
                break;
            case TileType.Base:
                this._color = `hsl(120, 60%, ${MathUtils.randFloat(30, 35) }%)`;
                break;
            case TileType.Rock:
                this._color = `hsl(0, 0%, ${MathUtils.randFloat(30, 35) }%)`;
                break;
            case TileType.Sand:
                this._color = `hsl(24, 100%, ${MathUtils.randFloat(32, 35) }%)`;
                break;
            default:
                throw new Error('Invalid terrain');
        }
    }
}