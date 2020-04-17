
export abstract class SpawingBuildingsRepositoryservice {

    abstract save(buildingId: string): void;

    abstract getAll(): string[];

    abstract remove(buildingId: string): void;

    abstract countSpawingBuildings(): number;

}