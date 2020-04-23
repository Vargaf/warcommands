import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { UnitGenericDTO } from 'src/warcommands/gameEngine/domain/units/model/unit-generic.dto';
import * as _ from "lodash";

export class InMemoryUnitsRepositoryService implements UnitsRepositoryService {
    
    private unitsList: Map<string, UnitGenericDTO> = new Map<string, UnitGenericDTO>();

    save(unit: UnitGenericDTO): void {
        const clone = _.cloneDeep(unit);
        this.unitsList.set(clone.id, clone);
    }

    findById(unitId: string): UnitGenericDTO {
        return _.cloneDeep(this.unitsList.get(unitId));
    }

    remove(unit: UnitGenericDTO): void {
        this.unitsList.delete(unit.id);
    }

}