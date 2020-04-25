import { UnitRepositoryService } from 'src/warcommands/basic-mode/domain/units/services/unit-repository.service';
import { UnitGenericDTO } from 'src/warcommands/basic-mode/domain/units/unit-generic.dto';
import { Injectable } from '@angular/core';
import { UnitNgrxRepositoryService } from '../../ngrx/units/unit-ngrx-repository.service';
import * as _ from "lodash";

@Injectable({
    providedIn: 'root'
})
export class InMemoryUnitRepositoryService implements UnitRepositoryService {
    
    private unitList: Map<string, UnitGenericDTO> = new Map<string, UnitGenericDTO>();

    constructor(
        private readonly unitNgrxRepositoryService: UnitNgrxRepositoryService
    ) {}

    save(unit: UnitGenericDTO): void {
        const clone = _.cloneDeep(unit);
        this.unitList.set(unit.id, unit);
        this.unitNgrxRepositoryService.save(clone);
    }

    findById(unitId: string): UnitGenericDTO {
        return this.unitList.get(unitId);
    }

    remove(unit: UnitGenericDTO): void {
        this.unitList.delete(unit.id);
        this.unitNgrxRepositoryService.remove(unit);
    }
}