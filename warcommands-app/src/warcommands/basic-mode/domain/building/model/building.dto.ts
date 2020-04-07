import { BuildingTypeEnum } from './building-type.enum';
import { CoordinatesEntity } from '../../share/model/coordinates.entity';

export interface BuildingDTO extends CoordinatesEntity {
    id: string;
    type: BuildingTypeEnum;
    sizeWidth: number;
    sizeHeight: number;
    playerId: string;
}
