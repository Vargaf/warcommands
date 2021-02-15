import { Injectable, ElementRef, ViewContainerRef, ComponentRef } from '@angular/core';
import { CommandListDragDropManagerService } from './command-list-drag-drop-manager.service';
import { CommandType } from '../../command/model/command-type.enum';
import { CommandContainerDTO } from '../../command-container/model/command-container.dto';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';
import { CommandComponentManagerService } from '../../command-component/services/command-component-manager.service';
import { CommandContainerDragDropManagerService } from '../../command-container/services/command-container-drag-drop-manager.service';
import { CommandDropRemoveManagerService } from '../../command/services/command-drop-remove-manager.service';
import { CommandDropCancelManagerService } from '../../command/services/command-drop-cancel-manager.service';

@Injectable({
    providedIn: 'root'
})
export class CommandDragDropManagerService {

    constructor(
        private readonly commandListDragDropManager: CommandListDragDropManagerService,
        private readonly commandContainerDragDropManager: CommandContainerDragDropManagerService,
        private readonly commandComponentManagerService: CommandComponentManagerService,
        private readonly commandRemoveManager: CommandDropRemoveManagerService,
        private readonly commandCancelManager: CommandDropCancelManagerService,
    ) {}

    createCommandListDrop(commandListDivElement: ElementRef<HTMLDivElement>): void {
        this.commandListDragDropManager.createCommandListDrop(commandListDivElement);
    }

    addDraggableElementToCommandList(dragableElement: ElementRef<HTMLDivElement>, commandType: CommandType, position: number): void {
        this.commandListDragDropManager.addDraggableItem(dragableElement, commandType, position);
    }

    createCommandContainerDrop(commandContainerDivElement: ElementRef<HTMLDivElement>, commandContainer: CommandContainerDTO, scrollableElement: HTMLElement): void {
        this.commandContainerDragDropManager.createCommandContainerDrop(commandContainerDivElement, commandContainer, scrollableElement);
    }

    createDeleteCommandDropContainer(deleteCommandContainerDivElement: ElementRef<HTMLDivElement>, deleteButtonDragElement: ElementRef<HTMLDivElement>): void {
        this.commandRemoveManager.createDeleteCommandDropContainer(deleteCommandContainerDivElement, deleteButtonDragElement);
    }

    createCancelCommandDragContainer(cancelCommandContainerDivElement: ElementRef<HTMLDivElement>, cancelButtonDragElement: ElementRef<HTMLDivElement>): void {
        this.commandCancelManager.createCancelCommandDropContainer(cancelCommandContainerDivElement, cancelButtonDragElement);
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
