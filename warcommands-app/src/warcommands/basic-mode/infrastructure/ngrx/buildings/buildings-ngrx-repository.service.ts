import * as BuildingActions from 'src/ngrx/basic-mode/buildings/actions';
import * as BuildingSelectors from 'src/ngrx/basic-mode/buildings/selectors';
import { Injectable } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BuildingDTO } from 'src/warcommands/basic-mode/domain/building/model/building.dto';
import { UnitGenericDTO } from 'src/warcommands/basic-mode/domain/units/model/unit-generic.dto';
import { ResourcesDTO } from 'src/warcommands/basic-mode/domain/share/model/resources.dto';

@Injectable({
    providedIn: 'root'
})
export class BuildingsNgrxRepositoryService {

    constructor(
        private readonly store: Store<BuildingSelectors.BuildingListFeatureState>
    ) {}

    save(building: BuildingDTO): void {
        this.store.dispatch(BuildingActions.addBuilding({ building }));
    }

    watchBuilding(buildingId: string): Observable<BuildingDTO> {
        return this.store.pipe(select(BuildingSelectors.buildingSelector, { buildingId }));
    }

    watchBuildingList(): Observable<{ [index: string]: BuildingDTO}> {
        return this.store.pipe(select(BuildingSelectors.buildingListSelector));
    }

    remove(building: BuildingDTO): void {
        this.store.dispatch(BuildingActions.removeBuilding({ building }));
    }

    addUnitToQueue(unit: UnitGenericDTO): void {
        this.store.dispatch(BuildingActions.addUnitToQueue({ unit }));
    }

    removeUnitFromQueue(unit: UnitGenericDTO): void {
        this.store.dispatch(BuildingActions.removeUnitFromQueue({ unit }));
    }

    updateBaseResources(baseId: string, resources: ResourcesDTO): void {
        this.store.dispatch(BuildingActions.updateBaseResources({ baseId, resources }));
    }

}