import { BaseBuildingDTO } from '../../building/base/base-building.dto';

export interface MapConfiguration {
    tiles: number[][];
    size: {
        width: number,
        height: number
    };
    numberOfPlayers: number;
    playerBaseList: BaseBuildingDTO[];
}
