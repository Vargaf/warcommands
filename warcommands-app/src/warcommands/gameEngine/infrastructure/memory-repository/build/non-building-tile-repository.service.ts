import { NonBuildingTileRepository } from 'src/warcommands/gameEngine/domain/build/repositories/non-building-tile-repository.service';
import { CoordinatesEntity } from 'src/warcommands/gameEngine/domain/maps/model/coordinates.entity';

export class NonBuildingTileRepositoryService implements NonBuildingTileRepository {

    private nonBuildingTiles: CoordinatesEntity[] = [];

    clear(): void {
        this.nonBuildingTiles = [];
    }

    addNonBuildingTile(xCoordinate: number, yCoordinate: number): void {
        this.nonBuildingTiles.push({yCoordinate, xCoordinate});
    }

}
