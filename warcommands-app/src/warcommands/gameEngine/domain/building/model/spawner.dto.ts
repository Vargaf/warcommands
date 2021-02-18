import { CoordinatesEntity } from '../../maps/model/coordinates.entity';
import { UnitGenericDTO } from '../../units/model/unit-generic.dto';

export interface SpawnerDTO {
    queueList: UnitGenericDTO[];
    spawnRelativeCoordinates: CoordinatesEntity;
    unitSpawning: {
        unit: UnitGenericDTO | null,
        spawnFinish: number | null,
        spawnStart: number | null,
    }
}