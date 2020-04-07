import { BlockedTileRepository } from 'src/warcommands/gameEngine/domain/building/repositories/blocked-tile-repository.service';
import { CoordinatesEntity } from 'src/warcommands/gameEngine/domain/maps/model/coordinates.entity';

export class InMemoryBlockedTileRepositoryService implements BlockedTileRepository {

    // private blockedTiles: CoordinatesEntity[] = [];

    private blockedTiles: Map<string, CoordinatesEntity> = new Map<string, CoordinatesEntity>();

    save(xCoordinate: number, yCoordinate: number): void {
        const index: string = xCoordinate + ':' + yCoordinate;
        this.blockedTiles.set(index, {yCoordinate, xCoordinate});
    }

    remove(xCoordinate: number, yCoordinate: number): void {
        const index: string = xCoordinate + ':' + yCoordinate;
        this.blockedTiles.delete(index);
    }

    hasCoordinate(xCoordinate: number, yCoordinate: number): boolean {
        const index: string = xCoordinate + ':' + yCoordinate;
        return this.blockedTiles.has(index);
    }

}
