import { UnitBlockedTileRepositoryService } from 'src/warcommands/gameEngine/domain/maps/repositories/unit-blocked-tile-repository.service';
import { UnitGenericDTO } from 'src/warcommands/gameEngine/domain/units/model/unit-generic.dto';

export class InMemoryUnitBlockedTileRepositoryService implements UnitBlockedTileRepositoryService {
    
    private unitTileList: Map<string, string> = new Map<string, string>();
    private blockedTileList: Map<string, string> = new Map<string, string>();

    addUnit(unit: UnitGenericDTO): void {
        this.unitTileList.set(unit.xCoordinate + ':' + unit.yCoordinate, unit.id);
    }

    addTileBlocked(xCoordinate: number, yCoordinate: number): void {
        this.blockedTileList.set(xCoordinate + ':' + yCoordinate, "blocked");
    }

    getUnitIdBlokingTile(xCoordinate: number, yCoordinate: number): string {
        return this.unitTileList.get(xCoordinate + ':' + yCoordinate);
    }

    isBlocked(xCoordinate: number, yCoordinate: number): boolean {
        return this.unitTileList.has(xCoordinate + ':' + yCoordinate) || 
            this.blockedTileList.has(xCoordinate + ':' + yCoordinate) ||
            false;
    }

    free(xCoordinate: number, yCoordinate: number): void {
        this.unitTileList.delete(xCoordinate + ':' + yCoordinate);
    }
    
}