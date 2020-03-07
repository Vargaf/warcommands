import { Injectable, ElementRef, ViewContainerRef, ComponentRef } from '@angular/core';
import { CommandListDragDropManagerService } from './command-list-drag-drop-manager.service';
import { CommandType } from '../../command/model/command-type.enum';
import { CommandContainerDTO } from '../../command-container/model/command-container.dto';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';
import { CommandComponentManagerService } from '../../command-component/services/command-component-manager.service';
import { CommandContainerDragDropManagerService } from '../../command-container/services/command-container-drag-drop-manager.service';
import { CommandWrapperDTO } from '../model/command-wrapper.dto';

@Injectable({
    providedIn: 'root'
})
export class CommandDragDropManagerService {

    constructor(
        private readonly commandListDragDropManager: CommandListDragDropManagerService,
        private readonly commandContainerDragDropManager: CommandContainerDragDropManagerService,
        private readonly commandComponentManagerService: CommandComponentManagerService
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

    addDragableElementToCommandContainer(dragableElement: ElementRef<HTMLDivElement>, commandWrapper: CommandWrapperDTO): void {
        this.commandContainerDragDropManager.addDragableElementToCommandContainer(dragableElement, commandWrapper);
    }

    createCommandComponent(commandWrapper: CommandWrapperDTO, elementViewContainerRef: ViewContainerRef): void {
        const component: ComponentRef<any> =
            this.commandComponentManagerService.createComponent(elementViewContainerRef, commandWrapper.command);
        this.addDragableElementToCommandContainer(component.location.nativeElement.parentElement, commandWrapper);
    }

    removeCommandComponent(commandWrapperDTO: CommandWrapperDTO): void {
        this.commandComponentManagerService.removeComponent(commandWrapperDTO.command.id);
        this.commandContainerDragDropManager.removeDraggableElementFromCommandContainer(commandWrapperDTO);
    }

}
