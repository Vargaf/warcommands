import { HexTileCoordinates } from "../model/hexTileCoordinates.ts";

const HexTileDirectionVectors = [
    new HexTileCoordinates(1, 0, -1), new HexTileCoordinates(1, -1, 0), new HexTileCoordinates(0, -1, 1),
    new HexTileCoordinates(-1, 0, 1), new HexTileCoordinates(-1, 1, 0), new HexTileCoordinates(0, 1, -1)
];

export function hexDirection(direction: number): HexTileCoordinates {
    if (direction < 0 || direction > HexTileDirectionVectors.length) {
        throw new Error('Invalid hex tile direction');
    }

    return HexTileDirectionVectors[direction];
}

export function hexCoordinatesAdd(hexCoordinates1: HexTileCoordinates, hexCoordinates2: HexTileCoordinates): HexTileCoordinates {
    return new HexTileCoordinates(
        hexCoordinates1.q + hexCoordinates2.q,
        hexCoordinates1.r + hexCoordinates2.r,
        hexCoordinates1.s + hexCoordinates2.s);
}

export function hexCoordinatesNeighbor(hexCoordinates: HexTileCoordinates, direction: number): HexTileCoordinates {
    return hexCoordinatesAdd(hexCoordinates, hexDirection(direction));
}

export function hexCoordinateScale(hexCoordinates: HexTileCoordinates, factor: number): HexTileCoordinates {
    return new HexTileCoordinates(hexCoordinates.q * factor, hexCoordinates.r * factor, hexCoordinates.s * factor);
}

export function hexTileReflection(tileCoordinates: HexTileCoordinates): HexTileCoordinates {
    return new HexTileCoordinates(-tileCoordinates.q, -tileCoordinates.r, -tileCoordinates.s);
}