import { TilePathfindingType } from '../../maps/model/tile-pathfinding-type.enum';

export class IsBlockedTileHelper {

    static check(tileType: TilePathfindingType): boolean {
        let isBlockedTile = true;

        switch (tileType) {
            case TilePathfindingType.Grass: {
                isBlockedTile = false;
                break;
            }
            case TilePathfindingType.Sand: {
                isBlockedTile = false;
                break;
            }
        }

        return isBlockedTile;
    }

}