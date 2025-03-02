import { HexTile } from "./hexTile.ts";

export class GameMap {
    constructor(private map: Array<HexTile>) {
    }

    getMap(): Array<HexTile> {
        return this.map;
    }
}