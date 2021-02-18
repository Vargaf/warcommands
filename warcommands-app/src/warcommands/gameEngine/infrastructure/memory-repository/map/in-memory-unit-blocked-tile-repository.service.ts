import { UnitBlockedTileRepositoryService } from 'src/warcommands/gameEngine/domain/maps/repositories/unit-blocked-tile-repository.service';
import { UnitGenericDTO } from 'src/warcommands/gameEngine/domain/units/model/unit-generic.dto';

export class InMemoryUnitBlockedTileRepositoryService implements UnitBlockedTileRepositoryService {
    
    private unitTileList: Map<string, string[]> = new Map<string, string[]>();
    private blockedTileList: Map<string, string> = new Map<string, string>();

    addUnit(unit: UnitGenericDTO): void {
        const index = unit.xCoordinate + ':' + unit.yCoordinate;
        if (!this.unitTileList.has(index)) {
            this.unitTileList.set(index,[]);
        }
        const currentUnitsOnTile = this.unitTileList.get(index);
        if(currentUnitsOnTile) {
            currentUnitsOnTile.push(unit.id)
            this.unitTileList.set(index, currentUnitsOnTile);
        }
    }

    addTileBlocked(xCoordinate: number, yCoordinate: number): void {
        this.blockedTileList.set(xCoordinate + ':' + yCoordinate, "blocked");
    }

    getUnitIdListBlokingTile(xCoordinate: number, yCoordinate: number): string[] {
        const currentUnitsOnTile = this.unitTileList.get(xCoordinate + ':' + yCoordinate);
        if(currentUnitsOnTile) {
            return currentUnitsOnTile;
        }

        return [];
    }

    isBlocked(xCoordinate: number, yCoordinate: number): boolean {
        return this.unitTileList.has(xCoordinate + ':' + yCoordinate) || 
            this.blockedTileList.has(xCoordinate + ':' + yCoordinate) ||
            false;
    }

    removeUnit(unit: UnitGenericDTO): void {
        const index = unit.xCoordinate + ':' + unit.yCoordinate;
        const unitList: string[] = this.unitTileList.get(index) || [];

        if (!unitList) {
            console.log('ups');
        }

        if (unitList.length === 1) {
            this.unitTileList.delete(index);
        } else {
            const unitIndex = unitList.findIndex((unitId) => {
                return unitId === unit.id;
            });
            unitList.splice(unitIndex, 1);
            this.unitTileList.set(index, unitList);
        }
    }
    
}