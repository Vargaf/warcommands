import { CoordinatesEntity } from '../../maps/model/coordinates.entity';
import { BuildingType } from './building-type.enum';

export interface BuildingDTO extends CoordinatesEntity {
    id: string;
    type: BuildingType;
    sizeWidth: number;
    sizeHeight: number;
}