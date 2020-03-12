import { Injectable, ElementRef, ViewContainerRef, ComponentRef } from '@angular/core';
import { CommandListDragDropManagerService } from './command-list-drag-drop-manager.service';
import { CommandType } from '../../command/model/command-type.enum';
import { CommandContainerDTO } from '../../command-container/model/command-container.dto';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';
import { CommandComponentManagerService } from '../../command-component/services/command-component-manager.service';
import { CommandContainerDragDropManagerService } from '../../command-container/services/command-container-drag-drop-manager.service';
import { CommandRemoveManagerService } from '../../command/services/command-remove-manager.service';

@Injectable({
    providedIn: 'root'
})
export class CommandDragDropManagerService {

    constructor(
        private readonly commandListDragDropManager: CommandListDragDropManagerService,
        private readonly commandContainerDragDropManager: CommandContainerDragDropManagerService,
        private readonly commandComponentManagerService: CommandComponentManagerService,
        private readonly commandRemoveManager: CommandRemoveManagerService
    ) {}

    createCommandListDrop(commandListDivElement: ElementRef<HTMLDivElement>): void {
        this.commandListDragDropManager.createCommandListDrop(commandListDivElement);
    }

    addDraggableElementToCommandList(dragableElement: ElementRef<HTMLDivElement>, commandType: CommandType, position: number): void {
        this.commandListDragDropManager.addDraggableItem(dragableElement, commandType, position);
    }

    createCommandContainerDrop(commandContainerDivElement: ElementRef<HTMLDivElement>, commandContainer: CommandContainerDTO): void {
        this.commandContainerDragDropManager.createCommandContainerDrop(commandContainerDivElement, commandContainer);
    }

    createDeleteCommandDropContainer(deleteCommandContainerDivElement: ElementRef<HTMLDivElement>): void {
        this.commandRemoveManager.createDeleteCommandDropContainer(deleteCommandContainerDivElement);
    }

    addDragableElementToCommandContainer(dragableElement: ElementRef<HTMLDivElement>, command: GenericCommandDTO, position: number): void {
        this.commandContainerDragDropManager.addDragableElementToCommandContainer(dragableElement, command, position);
    }

    createCommandComponent(elementViewContainerRef: ViewContainerRef, command: GenericCommandDTO, position: number): void {
        setTimeout(() => {
            const component: ComponentRef<any> =
            this.commandComponentManagerService.createComponent(elementViewContainerRef, command);
            this.addDragableElementToCommandContainer(component.location.nativeElement.parentElement, command, position);
        }, 0);
    }

    removeCommandComponent(command: GenericCommandDTO, commandContainerId: string): void {
        this.commandComponentManagerService.removeComponent(command.id);
        this.commandContainerDragDropManager.removeDraggableElementFromCommandContainer(command, commandContainerId);
    }

}
