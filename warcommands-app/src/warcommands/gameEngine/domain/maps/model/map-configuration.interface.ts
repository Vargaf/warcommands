import { PlayersBaseListEntity } from '../../base/players-base-list.entity';

export interface MapConfiguration {
    tiles: number[][];
    size: {
        width: number,
        height: number
    };
    numberOfPlayers: number;
    playerBaseList: PlayersBaseListEntity;
}
