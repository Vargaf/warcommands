import { HexTile } from "../model/hexTile.ts";
import { GameMap } from "../model/gameMap.ts";

export class MapService {

    private map: GameMap;

    gameMap(): GameMap {
        return this.map;
    }

    initializeMap(mapSize: number): void {
        this.buildMap(mapSize);
    }

    private buildMap(rings: number): void {
        let hexagonCount: number = 0;
        const mapTiles: Array<HexTile> = new Array<HexTile>();

        if(rings == 1) {
            mapTiles.push(new HexTile(0, 0, 0));
        } else {
            for (let q = -rings+1; q < rings; q++) {
                for (let r = -rings+1; r < rings; r++) {
                    for (let s = -rings+1; s < rings; s++) {
                        if(q+r+s == 0) {
                            mapTiles.push(new HexTile(q, r, s));
                            hexagonCount++;
                        }
                    }
                }
            }
            console.log(hexagonCount);
        }
        this.map = new GameMap(mapTiles);
    }
}