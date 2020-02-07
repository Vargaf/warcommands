
export abstract class NonBuildingTileRepository {

    abstract clear(): void;

    abstract addNonBuildingTile(xCoordinate: number, yCoordinate: number): void;

}
