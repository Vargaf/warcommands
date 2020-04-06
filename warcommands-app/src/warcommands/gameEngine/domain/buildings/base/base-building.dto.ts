import { BuildingDTO } from '../model/building.dto';
import { BuildingType } from '../model/building-type.enum';
import { CoordinatesEntity } from '../../maps/model/coordinates.entity';

export interface BaseBuildingDTO extends BuildingDTO {
    type: BuildingType.Base;
    name: string;
    queueList: [];
    spawnRelativeCoordinates: CoordinatesEntity;
}