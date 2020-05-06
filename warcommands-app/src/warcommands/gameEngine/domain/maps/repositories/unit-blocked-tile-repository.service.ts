import { UnitGenericDTO } from '../../units/model/unit-generic.dto';

export interface UnitBlockedTileRepositoryService {

    addUnit(unit: UnitGenericDTO): void;

    addTileBlocked(xCoordinate: number, yCoordinate: number): void;

    getUnitIdListBlokingTile(xCoordinate: number, yCoordinate: number): string[];

    isBlocked(xCoordinate: number, yCoordinate: number): boolean;

    removeUnit(unit: UnitGenericDTO): void

}