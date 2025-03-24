import { HexTile } from "./hexTile.ts";
import {
    hexCoordinatesAdd,
    hexCoordinateScale,
    hexCoordinatesNeighbor,
    hexDirection,
    hexTileReflection
} from "../Helpers/hexTile.helper.ts";
import { HexTileCoordinates } from "./hexTileCoordinates.ts";
import { MathUtils } from "three";
import { TileType } from "./tileType.enum.ts";

export class GameMap {

    private readonly numberOfTiles: number;
    private readonly indexTileCenter: number;

    constructor(private map: Array<HexTile>, private rings: number) {

        this.numberOfTiles = this.calculateNumberOfTiles(rings);
        this.indexTileCenter = Math.floor(this.numberOfTiles / 2);
    }

    getMap(): Array<HexTile> {
        return this.map;
    }

    fromCubeCoordinatesToArrayIndex(hexTile: HexTileCoordinates): number {

        const hexCubeCoordinateQOffset = this.hexCubeCoordinateQOffset(hexTile.q);

        return hexCubeCoordinateQOffset + hexTile.r;
    }

    setBase(): void {
        const ringToPlaceBase: number = Math.ceil(this.rings / 2);
        const centerTile: HexTileCoordinates = this.map[this.indexTileCenter].getCoordinates();
        const ring: number[] = this.buildRing(centerTile, ringToPlaceBase);

        this.buildRandomTerrainTiles(TileType.Water, 25, 6);
        this.buildRandomTerrainTiles(TileType.Sand, 25);
        this.buildRandomTerrainTiles(TileType.Rock, 25);
        this.buildRandomTerrainTiles(TileType.Grass, 30);

        const playerBaseTileIndex: number = ring[MathUtils.randInt(0, ring.length - 1)];
        const playerBaseTile: HexTile = this.getMap()[playerBaseTileIndex];
        this.buildSpiralTerrain(playerBaseTile.getCoordinates(), 6, TileType.Base);

        const enemyBaseTileIndex: number = this.fromCubeCoordinatesToArrayIndex(hexTileReflection(playerBaseTile.getCoordinates()));
        const enemyBaseTile: HexTile = this.getMap()[enemyBaseTileIndex];
        this.buildSpiralTerrain(enemyBaseTile.getCoordinates(), 6, TileType.Base);

    }

    private buildSpiralTerrain(centerTile: HexTileCoordinates, rings: number, terrain: TileType): void {
        let hexTile: HexTile =  this.map[this.fromCubeCoordinatesToArrayIndex(centerTile)];
        hexTile.setTerrain(terrain);

        for (let i = 1; i < rings; i++) {
            const ring: number[] = this.buildRing(centerTile, i);

            for (const tileIndex of ring) {
                hexTile = this.map[tileIndex];
                hexTile.setTerrain(terrain);
            }
        }
    }

    private buildRing(centerTile: HexTileCoordinates, radius: number): number[] {
        let hexInRing: HexTileCoordinates = hexCoordinatesAdd(centerTile, hexCoordinateScale(hexDirection(4), radius));
        const ring: number[] = [];
        let indexTile: number = 0;

        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < radius; j++) {
                indexTile = this.fromCubeCoordinatesToArrayIndex(hexInRing);

                if(0 <= indexTile && indexTile < this.numberOfTiles) {
                    ring.push(indexTile);
                }

                hexInRing = hexCoordinatesNeighbor(hexInRing, i);
            }
        }

        return ring;
    }

    private hexCubeCoordinateQOffset(hexCubeCoordinateQ: number): number {
        if ((hexCubeCoordinateQ - 1) <= -this.rings) {
            // In case the tile is in the first Q column then the offset is 0
            return 0;
        }

        let decreasingOffset = 0;

        if(hexCubeCoordinateQ > 0) {
            decreasingOffset = 1;
        }

        // We calculate the accumulated offset by all the previous Q columns
        return (this.rings - 1) - Math.abs(hexCubeCoordinateQ) + this.rings + decreasingOffset + this.hexCubeCoordinateQOffset(hexCubeCoordinateQ - 1);
    }

    private calculateNumberOfTiles(rings: number): number {
        if(rings <= 1) {
            return 1;
        } else {
            return 6 * (rings -1) + this.calculateNumberOfTiles(rings - 1);
        }
    }

    private buildRandomTerrainTiles(terrainType: TileType, percentage: number, terrainMaxRings: number = 3): void {
        const maxDesiredTiles: number = Math.floor(this.numberOfTiles * percentage / 100);
        const halfCurrentTiles: number = Math.floor(this.numberOfTiles / 2);
        let currentNumberOfNewTerrainTiles: number = 0;

        while (currentNumberOfNewTerrainTiles < maxDesiredTiles) {
            const rings: number = MathUtils.randInt(1, terrainMaxRings);
            const center: HexTile = this.map[MathUtils.randInt(0, halfCurrentTiles)];
            const mirrorCenter: HexTileCoordinates = hexTileReflection(center.getCoordinates());
            this.buildSpiralTerrain(center.getCoordinates(), rings, terrainType);
            this.buildSpiralTerrain(mirrorCenter, rings, terrainType);

            currentNumberOfNewTerrainTiles += this.calculateNumberOfTiles(rings) * 2;
        }
    }
}