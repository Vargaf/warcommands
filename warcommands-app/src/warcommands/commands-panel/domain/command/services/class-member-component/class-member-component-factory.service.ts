import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from "@angular/core";
import { ClassNameENUM } from '../../model/class-definition/class-name.enum';
import { ClassMemberDirective } from 'src/app/commands-panel/commands/class-member.directive';
import { GameClassMemberOptionsListComponent } from 'src/app/commands-panel/class-definition/game/game-class-member-options-list/game-class-member-options-list.component';
import { BaseClassMemberOptionListComponent } from 'src/app/commands-panel/class-definition/base/base-class-member-option-list/base-class-member-option-list.component';
import { ArrayClassMemberOptionListComponent } from 'src/app/commands-panel/class-definition/array/array-class-member-option-list/array-class-member-option-list.component';
import { WorkerClassMemberOptionListComponent } from 'src/app/commands-panel/class-definition/worker/worker-class-member-option-list/worker-class-member-option-list.component';

@Injectable({
    providedIn: 'root'
})
export class ClassMemberComponentFactory {

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
    ) {}

    getComponent(className: ClassNameENUM, directive: ClassMemberDirective): ComponentRef<any> {
        
        let component: any = null;

        switch (className) {
            case ClassNameENUM.Game: {
                component = GameClassMemberOptionsListComponent;
                break;
            }
            case ClassNameENUM.Base: {
                component = BaseClassMemberOptionListComponent;
                break;
            }
            case ClassNameENUM.Array:
                component = ArrayClassMemberOptionListComponent;
                break;
            case ClassNameENUM.Worker:
                component = WorkerClassMemberOptionListComponent;
                break;
            default: {
                throw new Error('The given className has no associated component: ' + className);
            }
        }
            
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        const viewContainerRef = directive.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
         
        return componentRef;
        
    }

}