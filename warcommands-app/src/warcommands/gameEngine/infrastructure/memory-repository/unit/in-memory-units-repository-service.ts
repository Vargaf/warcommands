import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/game-engine/units/services/units-repository.service';
import { UnitGenericDTO } from 'src/warcommands/gameEngine/domain/game-engine/units/model/unit-generic.dto';

export class InMemoryUnitsRepositoryService implements UnitsRepositoryService {
    
    private unitsList: Map<string, UnitGenericDTO> = new Map<string, UnitGenericDTO>();

    save(unit: UnitGenericDTO): void {
        this.unitsList.set(unit.id, unit);
    }

    findById(unitId: string): UnitGenericDTO {
        return this.unitsList.get(unitId);
    }

    remove(unit: UnitGenericDTO): void {
        this.unitsList.delete(unit.id);
    }

}