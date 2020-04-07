import * as BaseSelectors from '../../../../../ngrx/basic-mode/base/selectors';
import * as BaseActions from '../../../../../ngrx/basic-mode/base/actions';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BaseEntityInterface } from 'src/warcommands/basic-mode/domain/building/base/base-entity-interface';

@Injectable({
    providedIn: 'root'
})
export class BaseStoreService {

    constructor(
        private readonly store: Store<BaseSelectors.BaseFeatureState>
    ) { }

    addBase(base: BaseEntityInterface): void {
        this.store.dispatch(BaseActions.baseCreated( { base } ));
    }

}
