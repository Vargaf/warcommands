import {HexTileDTO} from "../Model/HexTile.dto.ts";
import {HexTileCoordinates} from "../Model/HexTileCoordinates.ts";
import {TileType} from "../Model/tileType.enum.ts";
import {MathUtils} from "three";
import {inject} from "inversify";
import {MessageBrokerService} from "./MessageBroker.service.ts";
import {MapGeneratedEvent} from "../Events/MapGenerated.event.ts";
import {hexTileReflection} from "../../../../Warcommands_old/GameEngineUI/GameService/Domain/Helpers/hexTile.helper.ts";

export class MapBuilderService {

    private _numberOfTiles: number = 0;
    private _centerTileIndex: number = 0;
    private _mapRingsSize: number = 0;

    constructor(@inject(MessageBrokerService) private readonly messageBroker: MessageBrokerService) {
    }

    private readonly hexTileDirectionVectors = [
        new HexTileCoordinates(1, 0, -1), new HexTileCoordinates(1, -1, 0), new HexTileCoordinates(0, -1, 1),
        new HexTileCoordinates(-1, 0, 1), new HexTileCoordinates(-1, 1, 0), new HexTileCoordinates(0, 1, -1)
    ];

    buildMap(mapRingsSize: number): void {

        if (mapRingsSize < 10) {
            mapRingsSize = 10;
        }

        this._mapRingsSize = mapRingsSize;
        this._numberOfTiles = this.calculateNumberOfTiles(mapRingsSize);
        this._centerTileIndex = Math.floor(this._numberOfTiles / 2);

        let gridMap: HexTileDTO[] = this.buildGridMap(mapRingsSize);
        gridMap = this.buildWaterTiles(gridMap);
        gridMap = this.buildSandTiles(gridMap);
        gridMap = this.buildRockTiles(gridMap);
        gridMap = this.buildGrassTiles(gridMap);

        gridMap = this.buildPlayerBases(gridMap);

        // TODO: Calcular y añadir los vecinos de todos los hexagonos

        const generatedMapEvent = new MapGeneratedEvent(gridMap);
        this.messageBroker.publish(generatedMapEvent);
        
    }

    private buildGridMap(rings: number): HexTileDTO[] {
        const gridMap: Array<HexTileDTO> = [];

        for (let q = -rings+1; q < rings; q++) {
            for (let r = -rings + 1; r < rings; r++) {
                for (let s = -rings + 1; s < rings; s++) {
                    if (q + r + s == 0) {
                        gridMap.push({
                            coordinates: new HexTileCoordinates(q, r, s),
                            terrain: TileType.Grass,
                            height: 0
                        });
                    }
                }
            }
        }

        return gridMap;
    }

    private calculateNumberOfTiles(rings: number): number {
        if(rings <= 1) {
            return 1;
        } else {
            return 6 * (rings -1) + this.calculateNumberOfTiles(rings - 1);
        }
    }

    private buildWaterTiles(gridMap: HexTileDTO[]): HexTileDTO[] {
        return this.buildRandomTerrainTiles(gridMap, TileType.Water, 25, 6);
    }

    private buildSandTiles(gridMap: HexTileDTO[]): HexTileDTO[] {
        return this.buildRandomTerrainTiles(gridMap, TileType.Sand, 25);
    }

    private buildRockTiles(gridMap: HexTileDTO[]): HexTileDTO[] {
        return this.buildRandomTerrainTiles(gridMap, TileType.Rock, 25);
    }

    private buildGrassTiles(gridMap: HexTileDTO[]): HexTileDTO[] {
        return this.buildRandomTerrainTiles(gridMap, TileType.Grass, 30);
    }

    private buildRandomTerrainTiles(gridMap: HexTileDTO[], terrainType: TileType, percentage: number, terrainMaxRings: number = 3): HexTileDTO[] {
        const maxDesiredTiles: number = Math.floor(this._numberOfTiles * percentage / 100);

        let currentNumberOfNewTerrainTiles: number = 0;

        while (currentNumberOfNewTerrainTiles < maxDesiredTiles) {
            const rings: number = MathUtils.randInt(1, terrainMaxRings);
            const ringCenter: HexTileDTO = gridMap[MathUtils.randInt(0, this._centerTileIndex)];
            const mirrorRingCenter: HexTileCoordinates = this.hexTileReflection(ringCenter.coordinates);

            gridMap = this.buildSpiralTerrain(gridMap, ringCenter.coordinates, rings, terrainType);
            gridMap = this.buildSpiralTerrain(gridMap, mirrorRingCenter, rings, terrainType);

            currentNumberOfNewTerrainTiles += this.calculateNumberOfTiles(rings) * 2;
        }

        return gridMap;
    }

    private hexTileReflection(tileCoordinates: HexTileCoordinates): HexTileCoordinates {
        return new HexTileCoordinates(-tileCoordinates.q, -tileCoordinates.r, -tileCoordinates.s);
    }

    private buildSpiralTerrain(gridMap: HexTileDTO[], centerTile: HexTileCoordinates, rings: number, terrain: TileType): HexTileDTO[] {
        let hexTile: HexTileDTO =  gridMap[this.fromCubeCoordinatesToArrayIndex(centerTile)];
        hexTile.terrain = terrain;

        for (let i = 0; i <= rings; i++) {
            const ring: number[] = this.buildRing(centerTile, i);

            for (const tileIndex of ring) {
                hexTile = gridMap[tileIndex];
                hexTile.terrain = terrain;

                switch (terrain) {
                    case TileType.Water:
                        hexTile.height =  -1;
                        break;
                    case TileType.Rock:
                        hexTile.height = (rings +1 -i) * 2;
                        break;
                    default:
                        hexTile.height = 0;
                }
            }
        }

        return gridMap;
    }

    private fromCubeCoordinatesToArrayIndex(hexTile: HexTileCoordinates): number {

        const hexCubeCoordinateQOffset = this.hexCubeCoordinateQOffset(hexTile.q);

        return hexCubeCoordinateQOffset + hexTile.r;
    }

    private hexCubeCoordinateQOffset(hexCubeCoordinateQ: number): number {
        if ((hexCubeCoordinateQ - 1) <= -this._mapRingsSize) {
            // In case the tile is in the first Q column then the offset is 0
            return 0;
        }

        let decreasingOffset = 0;

        if(hexCubeCoordinateQ > 0) {
            decreasingOffset = 1;
        }

        // We calculate the accumulated offset by all the previous Q columns
        return (this._mapRingsSize - 1) - Math.abs(hexCubeCoordinateQ) + this._mapRingsSize + decreasingOffset + this.hexCubeCoordinateQOffset(hexCubeCoordinateQ - 1);
    }

    private buildRing(centerTile: HexTileCoordinates, radius: number): number[] {
        let hexInRing: HexTileCoordinates = this.hexCoordinatesAdd(centerTile, this.hexCoordinateScale(this.hexDirection(4), radius));
        const ring: number[] = [];
        let indexTile: number = 0;

        if(radius == 0) {
            return [this.fromCubeCoordinatesToArrayIndex(centerTile)];
        }

        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < radius; j++) {
                indexTile = this.fromCubeCoordinatesToArrayIndex(hexInRing);

                if(0 <= indexTile && indexTile < this._numberOfTiles) {
                    ring.push(indexTile);
                }

                hexInRing = this.hexCoordinatesNeighbor(hexInRing, i);
            }
        }

        return ring;
    }

    private hexCoordinatesAdd(hexCoordinates1: HexTileCoordinates, hexCoordinates2: HexTileCoordinates): HexTileCoordinates {
        return new HexTileCoordinates(
            hexCoordinates1.q + hexCoordinates2.q,
            hexCoordinates1.r + hexCoordinates2.r,
            hexCoordinates1.s + hexCoordinates2.s);
    }

    private hexCoordinateScale(hexCoordinates: HexTileCoordinates, factor: number): HexTileCoordinates {
        return new HexTileCoordinates(hexCoordinates.q * factor, hexCoordinates.r * factor, hexCoordinates.s * factor);
    }

    private hexCoordinatesNeighbor(hexCoordinates: HexTileCoordinates, direction: number): HexTileCoordinates {
        return this.hexCoordinatesAdd(hexCoordinates, this.hexDirection(direction));
    }

    private hexDirection(direction: number): HexTileCoordinates {
        if (direction < 0 || direction > this.hexTileDirectionVectors.length) {
            throw new Error('Invalid hex tile direction');
        }

        return this.hexTileDirectionVectors[direction];
    }

    private buildPlayerBases(gridMap: HexTileDTO[]): HexTileDTO[] {

        const ringToPlaceBase: number = Math.ceil(this._mapRingsSize / 2);
        const ring: number[] = this.buildRing(gridMap[this._centerTileIndex].coordinates, ringToPlaceBase);

        const playerBaseTileIndex: number = ring[MathUtils.randInt(0, ring.length - 1)];
        const playerBaseTile: HexTileDTO = gridMap[playerBaseTileIndex];
        gridMap = this.buildSpiralTerrain(gridMap, playerBaseTile.coordinates, 6, TileType.Base);

        const enemyBaseTileIndex: number = this.fromCubeCoordinatesToArrayIndex(hexTileReflection(playerBaseTile.coordinates));
        const enemyBaseTile: HexTileDTO = gridMap[enemyBaseTileIndex];
        gridMap = this.buildSpiralTerrain(gridMap, enemyBaseTile.coordinates, 6, TileType.Base);

        return gridMap;
    }
}