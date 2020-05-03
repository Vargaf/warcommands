import { BuildingDTO } from './building.dto';
import { CoordinatesEntity } from '../../maps/model/coordinates.entity';

export interface FarmBuildingDTO extends BuildingDTO {
    maxUnitRoom: number;
    unitsFarmingIdList: string[];
    relativeEntranceCoordinates: CoordinatesEntity;
}