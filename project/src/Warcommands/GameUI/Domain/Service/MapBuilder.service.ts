import {HexTileDTO} from "../Model/HexTile.dto.ts";
import {HexTile} from "../Model/HexTile.ts";

export abstract class MapBuilderService {

    abstract drawMap(hexTileDTO: HexTileDTO[]): void;

    protected initializeMap(hexTileDTO: HexTileDTO[]): HexTile[] {
        const map: HexTile[] = [];

        for (const hexTile of hexTileDTO) {
            const tile: HexTile = new HexTile(hexTile);
            map.push(tile)
        }

        return map;
    }

}