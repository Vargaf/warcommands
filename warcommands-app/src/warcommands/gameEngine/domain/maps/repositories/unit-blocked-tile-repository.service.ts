import { UnitGenericDTO } from '../../game-engine/units/model/unit-generic.dto';

export interface UnitBlockedTileRepositoryService {

    addUnit(unit: UnitGenericDTO): void;

    addTileBlocked(xCoordinate: number, yCoordinate: number): void;

    getUnitIdBlokingTile(xCoordinate: number, yCoordinate: number): string;

    isBlocked(xCoordinate: number, yCoordinate: number): boolean;

    free(xCoordinate: number, yCoordinate: number): void

}