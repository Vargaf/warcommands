import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { CommandsComponentFactory } from './commands-component-factory.service';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';
import { CommandComponentRepositoryService } from './command-component-repository.service';

@Injectable({
    providedIn: 'root'
})
export class CommandComponentManagerService {

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly commandComponentRepositoryService: CommandComponentRepositoryService
    ) {}

    createComponent(elementViewContainerRef: ViewContainerRef, command: GenericCommandDTO): ComponentRef<any> {
        const component = CommandsComponentFactory.getComponent(command.type);

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        const componentRef: ComponentRef<any> = elementViewContainerRef.createComponent(componentFactory);
        componentRef.instance.commandData = command;

        this.commandComponentRepositoryService.save(componentRef);

        return componentRef;
    }

    removeComponent(commandId: string) {
        const component: ComponentRef<any> = this.commandComponentRepositoryService.findByCommandId(commandId);

        if (component) {
            component.destroy();
            this.commandComponentRepositoryService.remove(commandId);
        }
    }
}
