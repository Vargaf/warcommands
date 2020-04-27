import { Injectable, ViewContainerRef } from '@angular/core';
import { UnitGenericDTO } from '../unit-generic.dto';
import { DomElementComponentFactoryService } from 'src/warcommands/basic-mode/infrastructure/angular/dom-element-component-factory.service';
import { UnitRepositoryService } from './unit-repository.service';

@Injectable({
    providedIn: 'root'
})
export class UnitSpawningManagerService {

    private viewContainerRef: ViewContainerRef;

    constructor(
        private readonly domElementComponentFactoryService: DomElementComponentFactoryService,
        private readonly unitRepositoryService: UnitRepositoryService
    ) {}
    
    setViewContainerRef(viewContainerRef: ViewContainerRef): void {
        this.viewContainerRef = viewContainerRef;
    }

    unitSpawned(unit: UnitGenericDTO): void {
        const componentFactory = this.domElementComponentFactoryService.getUnitComponent(unit.type);
        const viewContainerRef = this.viewContainerRef;
        const componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.data = unit;

        this.unitRepositoryService.save(unit);
    }
}