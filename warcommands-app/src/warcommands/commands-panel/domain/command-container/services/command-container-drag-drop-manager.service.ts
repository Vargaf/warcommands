import { Injectable, ElementRef } from '@angular/core';
import { DragDrop, DropListRef, DragRef } from '@angular/cdk/drag-drop';
import { CommandContainerDTO } from '../model/command-container.dto';
import { CommandDropRepository } from '../../command-drag-drop/services/command-drop-repository.service';
import { CommandListDragDropManagerService } from '../../command-drag-drop/services/command-list-drag-drop-manager.service';
import { CommandWrapperDTO } from '../../command-drag-drop/model/command-wrapper.dto';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';
import { CommandDataFromCommandDroppedFactory } from '../../command/services/command-data-from-command-dropped.factory';
import { DropType } from '../../command-drag-drop/model/drop-type.enum';
import { CommandDragDropManagerEvents } from '../../command-drag-drop/services/command-drag-drop-manager-events';
import { CommandType } from '../../command/model/command-type.enum';
import { CommandDraggableElementRepositoryService } from '../../command-drag-drop/services/command-draggable-element-repository.service';

@Injectable({
    providedIn: 'root'
})
export class CommandContainerDragDropManagerService {

    constructor(
        private readonly angularDragDropService: DragDrop,
        private readonly commandDropRepositoryService: CommandDropRepository,
        private readonly commandDraggableElementRepositoryService: CommandDraggableElementRepositoryService,
        private readonly commandListDragDropManager: CommandListDragDropManagerService,
        private readonly commandDragDropManagerEvents: CommandDragDropManagerEvents,
    ) {}

    createCommandContainerDrop(commandContainerDivElement: ElementRef<HTMLDivElement>, commandContainer: CommandContainerDTO): void {
        const commandContainerDropRef: DropListRef = this.angularDragDropService.createDropList(commandContainerDivElement);
        commandContainerDropRef.withItems([]);
        this.commandDropRepositoryService.save(commandContainerDropRef, commandContainer.id);

        this.connectAllTheDropLists();
        this.setCommandContainerListDroppedObserver(commandContainerDropRef);
    }

    addDragableElementToCommandContainer(dragableElement: ElementRef<HTMLDivElement>, commandWrapper: CommandWrapperDTO): void {
        const dragRefElement: DragRef = this.angularDragDropService.createDrag(dragableElement);
        dragRefElement.data = commandWrapper.command;
        this.commandDraggableElementRepositoryService.addDraggableItemToDragList(
            dragRefElement,
            commandWrapper.command.parentCommandContainerId,
            commandWrapper.currentIndex);

        this.updateDropList(commandWrapper.command.parentCommandContainerId);
    }

    removeDraggableElementFromCommandContainer(commandWrapperDTO: CommandWrapperDTO): void {
        this.commandDraggableElementRepositoryService.removeDragItem(commandWrapperDTO);
        this.updateDropList(commandWrapperDTO.previousContainerId);
    }

    private updateDropList(commandContainerId: string): void {
        const dragList: DragRef[] = this.commandDraggableElementRepositoryService.getDragList(commandContainerId);
        const dropItem: DropListRef = this.commandDropRepositoryService.getDropItem(commandContainerId);
        dropItem.withItems(dragList);
        this.commandDropRepositoryService.save(dropItem, commandContainerId);
    }

    private connectAllTheDropLists() {
        const dropItemList = this.commandDropRepositoryService.getDropItemList();
        const commandListDropConainer = this.commandListDragDropManager.getCommandListDropContainer();

        if (commandListDropConainer) {
            commandListDropConainer.connectedTo(dropItemList);
        }

        for (const dropItem of dropItemList) {
            dropItem.connectedTo(dropItemList);
        }
    }

    private setCommandContainerListDroppedObserver(dropList: DropListRef): void {

        dropList.dropped.subscribe(event => {
            if (this.isANewCommand(event)) {
                const commandWrapper = this.buildNewCommandWrapper(event);
                this.commandDragDropManagerEvents.newCommandDroppedDispatch(commandWrapper);
            } else {
                const commandWrapper = this.buildCommandWrapper(event);
                commandWrapper.command = event.item.data;
                commandWrapper.dropType = DropType.MoveSameList;
                this.commandDragDropManagerEvents.moveCommandDroppedDispatch(commandWrapper);
            }
        });
    }

    private buildNewCommandWrapper(event: any): CommandWrapperDTO {
        const commandType = event.item.data;
        const fileId: string = (event.container.element as any).getAttribute('fileId');
        const commandContainerId: string = (event.container.element as any).getAttribute('id');
        const command: GenericCommandDTO = CommandDataFromCommandDroppedFactory.getCommandObject(commandType, fileId, commandContainerId);

        const commandWrapper: CommandWrapperDTO = this.buildCommandWrapper(event);
        commandWrapper.command = command;
        commandWrapper.dropType = DropType.New;

        return commandWrapper;
    }

    private buildCommandWrapper(event: any): CommandWrapperDTO {
        const commandContainerId: string = (event.container.element as any).getAttribute('id');

        const commandWrapper: CommandWrapperDTO = {
            containerId: commandContainerId,
            previousContainerId: (event.previousContainer.element as any).getAttribute('id'),
            previousIndex: event.previousIndex,
            currentIndex: event.currentIndex,
            command: null
        };

        return commandWrapper;
    }

    private isANewCommand(event: any): boolean {
        const commandListDropConainer: DropListRef = this.commandListDragDropManager.getCommandListDropContainer();
        return event.previousContainer.id === commandListDropConainer.id;
    }

}
