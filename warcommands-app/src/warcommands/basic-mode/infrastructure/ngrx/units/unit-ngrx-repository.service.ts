import * as UnitListActions from 'src/ngrx/basic-mode/units/actions';
import * as UnitListSelectors from 'src/ngrx/basic-mode/units/selectors';
import { Injectable } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UnitGenericDTO } from 'src/warcommands/basic-mode/domain/units/model/unit-generic.dto';

@Injectable({
    providedIn: 'root'
})
export class UnitNgrxRepositoryService {

    constructor(
        private readonly store: Store<UnitListSelectors.UnitListFeatureState>
    ) {}

    save(unit: UnitGenericDTO): void {
        this.store.dispatch(UnitListActions.addUnit({ unit }));
    }

    watchUnit(unitId: string): Observable<UnitGenericDTO> {
        return this.store.pipe(select(UnitListSelectors.unitSelector, { unitId }));
    }

    remove(unit: UnitGenericDTO): void {
        this.store.dispatch(UnitListActions.removeUnit({ unit }));
    }

}