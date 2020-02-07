import { CoordinatesEntity } from '../maps/model/coordinates.entity';
import { BuildEntity } from '../build/model/build.entity';

export interface BaseEntity extends BuildEntity {
    id: number;
    queueList: [];
    spawnRelativeCoordinates: CoordinatesEntity;
}
