import { HexTileCoordinates } from "./hexTileCoordinates.ts";
import { TileType } from "./tileType.enum.ts";
import {MathUtils} from "three";

export class HexTile {

    private readonly coordinates: HexTileCoordinates;
    private _terrain: TileType = TileType.Grass;
    private _height: number = 0;
    private _color: string = '';

    constructor(
        hexCubeCoordinateQ: number,
        hexCubeCoordinateR: number,
        hexCubeCoordinateS: number) {

        this.coordinates = new HexTileCoordinates(hexCubeCoordinateQ, hexCubeCoordinateR, hexCubeCoordinateS);
        this.setTerrain(TileType.Grass);
    }

    getCoordinates(): HexTileCoordinates {
        return this.coordinates;
    }

    setTerrain(tileType: TileType): void {
        this._terrain = tileType;
        this.assignColorByTerrain(tileType);
    }

    terrain(): TileType {
        return this._terrain;
    }

    setHeight(height: number): void {
        this._height = height;
    }

    height(): number {
        return this._height;
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

    color(): string {
        return this._color;
    }
}