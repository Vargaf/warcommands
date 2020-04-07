import { BuildingDTO } from '../model/building.dto';
import { BuildingTypeEnum } from '../model/building-type.enum';
import { CoordinatesEntity } from '../../share/model/coordinates.entity';

export interface BaseEntityInterface extends BuildingDTO {
    type: BuildingTypeEnum;
    name: string;
    queueList: [];
    spawnRelativeCoordinates: CoordinatesEntity;
}
