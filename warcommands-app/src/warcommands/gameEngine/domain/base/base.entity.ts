import { CoordinatesEntity } from '../maps/model/coordinates.entity';
import { BuildingDTO } from '../building/model/building.dto';
import { BuildingTypeEnum } from '../building/model/building-type.enum';

export interface BaseEntity extends BuildingDTO {
    type: BuildingTypeEnum.Base;
    queueList: [];
    spawnRelativeCoordinates: CoordinatesEntity;
    name: string;
}
