import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { CommandsComponentFactory } from './commands-component-factory.service';
import { CommandInterface } from '../../command/model/command.interface';

@Injectable({
    providedIn: 'root'
})
export class AddCommandComponentService {
    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly commandComponentFactory: CommandsComponentFactory
    ) {}

    addComponent(viewContainerRef: ViewContainerRef, commandData: CommandInterface): ComponentRef<any> {

        const component = this.commandComponentFactory.getComponent(commandData.type);

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        const componentRef: ComponentRef<any> = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.commandData = commandData;

        return componentRef;
    }
}
