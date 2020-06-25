import { Injectable, ElementRef } from '@angular/core';
import { DragDrop, DropListRef, DragRef } from '@angular/cdk/drag-drop';
import { CommandContainerDTO } from '../model/command-container.dto';
import { CommandDropRepository } from '../../command-drag-drop/services/command-drop-repository.service';
import { CommandListDragDropManagerService } from '../../command-drag-drop/services/command-list-drag-drop-manager.service';
import { CommandWrapperDTO } from '../../command-drag-drop/model/command-wrapper.dto';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';
import { CommandDataFromCommandDroppedFactory } from '../../command/services/command-data-from-command-dropped.factory';
import { DropType } from '../../command-drag-drop/model/drop-type.enum';
import { CommandDraggableElementRepositoryService } from '../../command-drag-drop/services/command-draggable-element-repository.service';
import { MouseDragDropHelperService } from '../../command-drag-drop/services/mouse-drag-drop-helper.service';
import { CommandDragDropManagerEvents } from '../../command-drag-drop/events/command-drag-drop-manager-events';
import { DragCustomPreviewService } from '../../command-drag-drop/services/drag-custom-preview.service';
import { CommandType } from '../../command/model/command-type.enum';
import { CommandRepositoryService } from '../../command/services/command-repository.service';

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
        private readonly mouseHelperService: MouseDragDropHelperService,
        private readonly dragCustomPreviewService: DragCustomPreviewService,
        private readonly commandRepositoryService: CommandRepositoryService,
        private readonly mouseDragDropHelperService: MouseDragDropHelperService,
    ) {}

    createCommandContainerDrop(commandContainerDivElement: ElementRef<HTMLDivElement>, commandContainer: CommandContainerDTO, scrollableElement: HTMLElement): void {
        const commandContainerDropRef: DropListRef = this.angularDragDropService.createDropList(commandContainerDivElement);
        if (scrollableElement) {
            commandContainerDropRef.autoScrollDisabled = false;
            commandContainerDropRef.withScrollableParents([scrollableElement]);
        }
        commandContainerDropRef.withItems([]);
        this.setDropAvailavilityFlagListener(commandContainerDropRef);
        this.commandDropRepositoryService.save(commandContainerDropRef, commandContainer.id);

        this.connectAllTheDropLists();
        this.setCommandContainerListDroppedObserver(commandContainerDropRef);
    }

    addDragableElementToCommandContainer(dragableElement: ElementRef<HTMLDivElement>, command: GenericCommandDTO, position: number): void {
        const dragRefElement: DragRef = this.angularDragDropService.createDrag(dragableElement);
        dragRefElement.data = command;
        dragRefElement.dragStartDelay = 200;

        if (command.type !== CommandType.GameLoop) {
            const previewTemplate = this.dragCustomPreviewService.getDragHelperTemplate(command.type);
            dragRefElement.withPreviewTemplate(previewTemplate);
            dragRefElement.withPlaceholderTemplate(previewTemplate);
            this.setDragManagmentEvents(dragRefElement);
        } else {
            dragRefElement.disabled = true;
        }

        this.commandDraggableElementRepositoryService.addDraggableItemToDragList(
            dragRefElement,
            command.parentCommandContainerId,
            position);

        this.updateDropList(command.parentCommandContainerId);
    }

    removeDraggableElementFromCommandContainer(command: GenericCommandDTO, commandContainerId: string): void {
        this.commandDraggableElementRepositoryService.removeDragItem(command, commandContainerId);
        this.updateDropList(commandContainerId);
    }

    private setDragManagmentEvents(dragRefElement: DragRef): void {
        dragRefElement.moved.subscribe((event) => {
            if (event.event instanceof MouseEvent) {
                this.mouseDragDropHelperService.saveActiveCommandContainerByMouse(event.event);
            } else {
                this.mouseDragDropHelperService.saveActiveCommandContainerByTouchDevice(event.event);
            }
        });

        /**
         * For touchable devices, we disable all command container to activate only one at a time
         * with the MouseDragDromHelperService
         */
        dragRefElement.started.subscribe((event) => {
            const dropList: DropListRef[] = this.commandDropRepositoryService.getDropItemList();
            
            for (const drop of dropList) {
                
                const commandContainerId = (drop.element as any).id;
                drop.disabled = true;
                this.commandDropRepositoryService.save(drop, commandContainerId);
            }
        });

        /**
         * For touchable devices, we enable all command container to be albe to start dragging
         * any element
         */
        dragRefElement.ended.subscribe((event) => {
            const dropList: DropListRef[] = this.commandDropRepositoryService.getDropItemList();
            
            for (const drop of dropList) {
                const commandContainerId = (drop.element as any).id;
                drop.disabled = false;
                this.commandDropRepositoryService.save(drop, commandContainerId);
            }
        });
    }

    private setDropAvailavilityFlagListener(dropList: DropListRef): void {
        dropList.enterPredicate = (drag, drop) => {
            return (drop.element as any).getAttribute('id') === this.mouseHelperService.activeContainerId;
        };
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
                this.commandDragDropManagerEvents.commandCreatedDispatch(commandWrapper);
                this.buildInnerCommandContainers(commandWrapper.command);
            } else {
                const commandContainerId: string = (event.container.element as any).getAttribute('id');
                const commandWrapper = this.buildCommandWrapper(event);
                const command = this.commandRepositoryService.findById(event.item.data.id);
                command.parentCommandContainerId = commandContainerId;
                commandWrapper.command = command;
                this.commandRepositoryService.save(command);
                commandWrapper.dropType = DropType.MoveSameList;
                this.commandDragDropManagerEvents.commandMovedDispatch(commandWrapper);
            }
        });
    }

    private buildInnerCommandContainers(command: GenericCommandDTO): void {
        // tslint:disable-next-line: forin
        for (const innerCommandContainerIndex in command.innerCommandContainerIdList) {
            const commandContainer: CommandContainerDTO = {
                id: command.innerCommandContainerIdList[innerCommandContainerIndex],
                fileId: command.fileId,
                parentCommandId: command.id,
                commands: []
            };
            this.commandDragDropManagerEvents.commandContainerCreatedDispatch(commandContainer);
        }
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
        const previousContainerId = event.previousContainer.element.getAttribute('id');
        const commandListDropContainerId = (commandListDropConainer.element as any).getAttribute('id');
        return previousContainerId === commandListDropContainerId;
    }

}
