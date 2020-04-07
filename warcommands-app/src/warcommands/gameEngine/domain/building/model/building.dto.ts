import { CoordinatesEntity } from '../../maps/model/coordinates.entity';
import { BuildingTypeEnum } from './building-type.enum';

export interface BuildingDTO extends CoordinatesEntity {
    id: string;
    type: BuildingTypeEnum;
    sizeWidth: number;
    sizeHeight: number;
    playerId: string;
}
