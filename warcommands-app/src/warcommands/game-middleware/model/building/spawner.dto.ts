import { CoordinatesEntity } from '../map/coordinates.entity';
import { UnitGenericDTO } from '../unit/unit-generic.dto';

export interface SpawnerDTO {
    queueList: UnitGenericDTO[];
    spawnRelativeCoordinates: CoordinatesEntity;
    unitSpawning: {
        unit: UnitGenericDTO | null,
        spawnFinish: number | null,
        spawnStart: number | null,
    }
}