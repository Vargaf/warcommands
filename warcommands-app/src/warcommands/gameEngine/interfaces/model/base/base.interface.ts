import { CoordinatesInterface } from '../map/coordinates.interface';
import { BuildInterface } from '../build/build.interface';

export interface BaseInterface extends BuildInterface {
    id: number;
    unitCreationQueueList: [];
    spawnRelativeCoordinates: CoordinatesInterface;
}
