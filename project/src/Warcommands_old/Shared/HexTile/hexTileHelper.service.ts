import {HexTileCoordinates} from "../../GameEngineUI/GameService/Domain/model/hexTileCoordinates.ts";

export class HexTileHelperService {

    private hexTileDirectionVectors = [
        new HexTileCoordinates(1, 0, -1), new HexTileCoordinates(1, -1, 0), new HexTileCoordinates(0, -1, 1),
        new HexTileCoordinates(-1, 0, 1), new HexTileCoordinates(-1, 1, 0), new HexTileCoordinates(0, 1, -1)
    ];

    hexDirection(direction: number): HexTileCoordinates {
        if (direction < 0 || direction > this.hexTileDirectionVectors.length) {
            throw new Error('Invalid hex tile direction');
        }

        return this.hexTileDirectionVectors[direction];
    }

    hexCoordinatesAdd(hexCoordinates1: HexTileCoordinates, hexCoordinates2: HexTileCoordinates): HexTileCoordinates {
        return new HexTileCoordinates(
            hexCoordinates1.q + hexCoordinates2.q,
            hexCoordinates1.r + hexCoordinates2.r,
            hexCoordinates1.s + hexCoordinates2.s);
    }

    hexCoordinatesNeighbor(hexCoordinates: HexTileCoordinates, direction: number): HexTileCoordinates {
        return this.hexCoordinatesAdd(hexCoordinates, this.hexDirection(direction));
    }

    hexCoordinateScale(hexCoordinates: HexTileCoordinates, factor: number): HexTileCoordinates {
        return new HexTileCoordinates(hexCoordinates.q * factor, hexCoordinates.r * factor, hexCoordinates.s * factor);
    }

    hexTileReflection(tileCoordinates: HexTileCoordinates): HexTileCoordinates {
        return new HexTileCoordinates(-tileCoordinates.q, -tileCoordinates.r, -tileCoordinates.s);
    }
}