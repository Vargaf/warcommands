import { BuildingDTO } from '../model/building.dto';
import { BuildingTypeEnum } from '../model/building-type.enum';
import { CoordinatesEntity } from '../../share/model/coordinates.entity';
import { UnitGenericDTO } from '../../units/unit-generic.dto';

export interface BaseEntityInterface extends BuildingDTO {
    type: BuildingTypeEnum;
    name: string;
    queueList: UnitGenericDTO[];
    spawnRelativeCoordinates: CoordinatesEntity;
    resources: {
        matter: number;
        energy: number;
    }
}
