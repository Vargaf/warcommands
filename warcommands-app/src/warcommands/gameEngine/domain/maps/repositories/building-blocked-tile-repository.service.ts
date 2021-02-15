
export abstract class BuildingBlockedTileRepository {

    abstract save(xCoordinate: number, yCoordinate: number): void;

    abstract remove(xCoordinate: number, yCoordinate: number): void;

    abstract hasCoordinate(xCoordinate: number, yCoordinate: number): boolean;

}
