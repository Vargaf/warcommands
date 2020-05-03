import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { UnitGenericDTO } from 'src/warcommands/gameEngine/domain/units/model/unit-generic.dto';
import * as _ from "lodash";
import { UnitTypeENUM } from 'src/warcommands/gameEngine/domain/units/model/unit-type.enum';

export class InMemoryUnitsRepositoryService implements UnitsRepositoryService {
    
    private unitsList: Map<string, UnitGenericDTO> = new Map<string, UnitGenericDTO>();

    save(unit: UnitGenericDTO): void {
        const clone = _.cloneDeep(unit);
        this.unitsList.set(clone.id, clone);
    }

    findById(unitId: string): UnitGenericDTO {
        return _.cloneDeep(this.unitsList.get(unitId));
    }

    findByTypeAndPlayer(unitType: UnitTypeENUM, playerId: string): UnitGenericDTO[] {
        const unitList: UnitGenericDTO[] = [];

        this.unitsList.forEach((unit) => {
            if (unit.type === unitType && unit.playerId === playerId) {
                unitList.push(unit);
            }
        });

        return unitList;
    }

    remove(unit: UnitGenericDTO): void {
        this.unitsList.delete(unit.id);
    }

    getAll(): UnitGenericDTO[] {
        const unitList: UnitGenericDTO[] = [];
        this.unitsList.forEach((unit) => {
            unitList.push(_.cloneDeep(unit));
        })
        
        return unitList;
    }

}