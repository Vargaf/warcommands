import { HexTile } from "../model/hexTile.ts";
import { GameMap } from "../model/gameMap.ts";

export class MapService {

    private map: GameMap = new GameMap([],0);

    gameMap(): GameMap {
        return this.map;
    }

    initializeMap(mapSize: number): void {
        if (mapSize < 3) {
            mapSize = 3;
        }
        this.buildMap(mapSize);
        this.setBase();
    }

    private buildMap(rings: number): void {
        const mapTiles: Array<HexTile> = new Array<HexTile>();

        if(rings == 1) {
            mapTiles.push(new HexTile(0, 0, 0));
        } else {
            for (let q = -rings+1; q < rings; q++) {
                for (let r = -rings+1; r < rings; r++) {
                    for (let s = -rings+1; s < rings; s++) {
                        if(q+r+s == 0) {
                            mapTiles.push(new HexTile(q, r, s));
                        }
                    }
                }
            }
        }
        this.map = new GameMap(mapTiles, rings);
    }

    private setBase(): void {
        this.map.setBase();
    }
}