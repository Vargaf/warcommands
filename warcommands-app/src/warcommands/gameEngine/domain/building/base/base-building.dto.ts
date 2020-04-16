import { CoordinatesEntity } from '../../maps/model/coordinates.entity';
import { BuildingTypeEnum } from '../model/building-type.enum';
import { BuildingDTO } from '../model/building.dto';

export interface BaseBuildingDTO extends BuildingDTO {
    type: BuildingTypeEnum;
    name: string;
    queueList: [];
    spawnRelativeCoordinates: CoordinatesEntity;
    resources: {
        matter: number;
        energy: number;
    }
}