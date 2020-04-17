import { CoordinatesEntity } from '../../maps/model/coordinates.entity';
import { UnitGenericDTO } from '../../game-engine/units/model/unit-generic.dto';

export interface SpawnerDTO {
    queueList: UnitGenericDTO[];
    spawnRelativeCoordinates: CoordinatesEntity;
    unitSpawning: {
        unit: UnitGenericDTO,
        spawnTime: number;
    }
}