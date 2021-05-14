import * as BuildingActions from 'src/ngrx/commands-panel/buildings/actions';
import * as BuildingSelectors from 'src/ngrx/commands-panel/buildings/selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BuildingDTO } from './model/building/building.dto';
import { UnitGenericDTO } from './model/unit/unit-generic.dto';
import { ResourcesDTO } from './model/resources/reources.dto';
import { Injectable } from '@angular/core';

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