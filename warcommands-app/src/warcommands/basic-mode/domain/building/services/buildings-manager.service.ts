import { Injectable } from '@angular/core';
import { BuildingDTO } from '../model/building.dto';
import { BaseStoreService } from 'src/warcommands/basic-mode/infrastructure/ngrx/base/base-store.service';
import { DomElementInjectorService } from 'src/warcommands/basic-mode/infrastructure/angular/dom-element-injector.service';
import { BaseEntityInterface } from '../base/base-entity-interface';

@Injectable({
    providedIn: 'root'
})
export class BuildingsManagerService {

    constructor(
        private readonly baseStoreService: BaseStoreService,
        private readonly domElementIjenctorService: DomElementInjectorService,
    ) {}

    addBuilding(building: BuildingDTO): void {
        this.baseStoreService.addBase((building as BaseEntityInterface));
        this.domElementIjenctorService.addBase((building as BaseEntityInterface));
    }

}