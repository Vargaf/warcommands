import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { CommandType } from '../../command/model/command-type.enum';
import { CommandsPreviewComponentFactory } from './commands-preview-component-factory.service';

@Injectable({
    providedIn: 'root'
})
export class DragCustomPreviewService {

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
    ) {}

    getDragHelperTemplate(commandType: CommandType): any {
        const component = CommandsPreviewComponentFactory.getComponent(commandType);

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        return (componentFactory as any).create().instance.getDragHelperTemplate();
    }

}
