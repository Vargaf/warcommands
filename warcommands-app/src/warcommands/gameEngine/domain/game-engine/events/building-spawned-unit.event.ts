import { UnitGenericDTO } from '../../units/model/unit-generic.dto';
import { EventInterface } from '../../game-event-bus/model/event.interface';
import { EventType } from '../../game-event-bus/model/event-type.enum';
import { BuildingDTO } from '../../building/model/building.dto';

interface BuildingSpawnedUnitEventDTO {
    unit: UnitGenericDTO,
    buildingId: string
}

export class BuildingSpawnedUnitEvent implements EventInterface {
    readonly type = EventType.BuildingSpawnedUnit;

    private _data: BuildingSpawnedUnitEventDTO = {
        unit: null,
        buildingId: null
    };

    constructor(building: BuildingDTO, unit: UnitGenericDTO) {
        this._data.buildingId = building.id;
        this._data.unit = unit;
    }

    get data(): BuildingSpawnedUnitEventDTO {
        return this._data;
    }
}