import { UnitGenericDTO } from "src/warcommands/game-middleware/model/unit/unit-generic.dto";
import { UnitsRepositoryInterface } from "src/warcommands/vr-mode/domain/units/services/units-repository-interface";
import * as _ from 'lodash';
import { UnitFilterDTO } from "src/warcommands/vr-mode/domain/units/model/unit-filter.dto";

export class InMemoryUnitsRepositoryService implements UnitsRepositoryInterface {
    
    private itemList: Map<string, UnitGenericDTO> = new Map();

    save(unit: UnitGenericDTO): void {
        this.itemList.set(unit.id, _.clone(unit));
    }

    findBy(filter: UnitFilterDTO): UnitGenericDTO[] {
        const filteredList: UnitGenericDTO[] = [];
        const filterKeyList = Object.keys(filter);

        this.itemList.forEach((item) => {
            
            let filtersMatch = true;

            for (const filterKey of filterKeyList) {
                const objectKey = filterKey as keyof UnitFilterDTO;
                if (item[objectKey] !== filter[objectKey]) {
                    filtersMatch = false;
                    break;
                }
            }

            if (filtersMatch) {
                filteredList.push(_.cloneDeep(item));
            }
        });

        return filteredList;
    }

    findById(unitId: string): UnitGenericDTO {
        const filter: UnitFilterDTO = {
            id: unitId
        };

        const unitList = this.findBy(filter);

        return unitList[0];
    }
}