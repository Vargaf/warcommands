import { UnitGenericDTO } from '../../units/model/unit-generic.dto';
import { CoordinatesEntity } from '../../share/model/coordinates.entity';

export interface SpawnerDTO {
    queueList: UnitGenericDTO[];
    spawnRelativeCoordinates: CoordinatesEntity;
    unitSpawning: {
        unit: UnitGenericDTO | null,
        spawnFinish: number,
        spawnStart: number
    }
}