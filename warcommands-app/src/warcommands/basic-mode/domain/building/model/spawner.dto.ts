import { UnitGenericDTO } from '../../units/unit-generic.dto';
import { CoordinatesEntity } from '../../share/model/coordinates.entity';

export interface SpawnerDTO {
    queueList: UnitGenericDTO[];
    spawnRelativeCoordinates: CoordinatesEntity;
    unitSpawning: {
        unit: UnitGenericDTO,
        spawnFinish: number,
        spawnStart: number
    }
}