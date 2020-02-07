import { CoordinatesEntity } from '../../maps/model/coordinates.entity';

export interface BuildEntity extends CoordinatesEntity {
    sizeWidth: number;
    sizeHeight: number;
}
