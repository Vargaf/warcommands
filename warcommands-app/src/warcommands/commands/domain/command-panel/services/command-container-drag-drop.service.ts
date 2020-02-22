import { Injectable, ElementRef, QueryList, ViewContainerRef } from '@angular/core';
import { CommandDroppedInterface } from 'src/warcommands/commands/infrastructure/angular/drag-drop/command-droped';
import { CommandContainerRepositoryService } from '../../command-container/services/command-container-repository.service';
import { v4 as uuid } from 'uuid';
import { CommandContainerDTO } from '../../command-container/model/command-container.dto';
import { DragDrop, DropListRef, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommandsDragDropRepositoy } from 'src/warcommands/commands/infrastructure/angular/drag-drop/commands-drag-drop.repository';
import { CommandListDragDropService } from './command-list-drag-drop.service';
import { Subscription } from 'rxjs';
import { DropType } from 'src/warcommands/commands/infrastructure/angular/drag-drop/drop-type.enum';
import { CommandDragDropService } from './command-drag-drop.service';
import { CommandDataDragDropService } from './command-data-drag-drop.service';
import { MouseDragDropHelperService } from './mouse-drag-drop-helper.service';

@Injectable({
    providedIn: 'root'
})
export class CommandContainerDragDropService {

    constructor(
        private readonly commandContainerRepository: CommandContainerRepositoryService,
        private readonly commandsDragDropRepository: CommandsDragDropRepositoy,
        private readonly commandListDragDropService: CommandListDragDropService,
        private readonly angularDragDropService: DragDrop,
        private readonly commandDragDropService: CommandDragDropService,
        private readonly commandDataDragDropService: CommandDataDragDropService,
        private readonly mouseHelperService: MouseDragDropHelperService
    ) {}

    createCommandDropContainer(
        commandContainer: CommandContainerDTO,
        dropCommandsContainer: ElementRef,
        commandViewContainer: QueryList<ViewContainerRef>,
        commandContainerList: CommandDroppedInterface[]
    ): void {
        this.commandContainerRepository.saveCommandContainer(commandContainer);
        this.commandsDragDropRepository.saveCommandContainerList(commandContainer.id, commandContainerList);
        this.commandsDragDropRepository.saveCommandViewContainer(commandContainer.id, commandViewContainer);

        const dropList = this.createDropListContainer(dropCommandsContainer);

        dropList.enterPredicate = (drag, drop) => {
            return (drop.element as any).getAttribute('id') === this.mouseHelperService.activeContainerId;
        };

        this.commandsDragDropRepository.saveDropItem(commandContainer.id, dropList);

        this.connectAllTheDropLists();

        this.setCommandItemContainerSubscribers(commandContainer.id, commandViewContainer);
        this.setCommandContainerListDroppedObserver(dropList);
    }

    private createDropListContainer(dropCommandsContainer: ElementRef): DropListRef {
        const dropList = this.angularDragDropService.createDropList(dropCommandsContainer);
        dropList.withItems([]);

        return dropList;
    }

    private connectAllTheDropLists() {
        const dropItemList = this.commandsDragDropRepository.getDropItemList();
        const commandListDropConainer = this.commandListDragDropService.getCommandListDropContainer();
        commandListDropConainer.connectedTo(dropItemList);

        for (const dropItem of dropItemList) {
            dropItem.connectedTo(dropItemList);
        }
    }

    private setCommandItemContainerSubscribers(commandContainerId: string, commandViewContainer: QueryList<ViewContainerRef>): void {

        const subscription: Subscription = commandViewContainer.changes.subscribe((change) => {
            this.commandViewContainerOnChangeEvent(change);
        });

        this.commandsDragDropRepository.saveCommandContainerSubscriptionItem(commandContainerId, subscription);
    }

    private commandViewContainerOnChangeEvent(commandItemContainer: QueryList<ViewContainerRef>): void {
        const viewContainerRef = commandItemContainer.toArray();

        for (const item of viewContainerRef) {
            if (item.element.nativeElement.parentElement.getAttribute('dirty') === 'true') {
                item.element.nativeElement.parentElement.removeAttribute('dirty');

                const containerId = item.element.nativeElement.parentElement.parentElement.getAttribute('id');
                const currentIndex = item.element.nativeElement.parentElement.getAttribute('currentIndex');

                const commandContainerList = this.commandsDragDropRepository.getCommandContainerList(containerId);
                const commandDropped: CommandDroppedInterface = commandContainerList[currentIndex];

                setTimeout(() => {
                    this.commandDragDropService.addCommandDropped(item, commandDropped);
                }, 50);
            }
        }
    }

    private setCommandContainerListDroppedObserver(
        dropList: DropListRef
    ): void {

        dropList.dropped.subscribe(event => {
            let commandDroppedData: CommandDroppedInterface ;

            if (this.isANewCommand(event)) {
                commandDroppedData = this.buildNewCommandDroppend(event);

            } else {
                const commandContainerId = (event.previousContainer.element as any).getAttribute('id');
                const commandDroppedDataList: CommandDroppedInterface[] =
                    this.commandsDragDropRepository.getCommandContainerList(commandContainerId);
                commandDroppedData = commandDroppedDataList[event.previousIndex];

                commandDroppedData.containerId = (event.container.element as any).getAttribute('id');
                commandDroppedData.previousContainerId = (event.previousContainer.element as any).getAttribute('id');
                commandDroppedData.fileId = (event.previousContainer.element as any).getAttribute('fileId');
                commandDroppedData.previousIndex = event.previousIndex;
                commandDroppedData.currentIndex = event.currentIndex;

                if (event.previousContainer.id === event.container.id) {
                    commandDroppedData.dropType = DropType.MoveSameList;
                } else {
                    commandDroppedData.dropType = DropType.MoveAnotherList;
                }

                commandDroppedDataList[event.previousIndex] = commandDroppedData;
                this.commandsDragDropRepository.saveCommandContainerList(commandContainerId, commandDroppedDataList);
            }

            this.handleDropEvent(commandDroppedData);
        });
    }

    private isANewCommand(event: any): boolean {
        const commandListDropConainer = this.commandListDragDropService.getCommandListDropContainer();
        return event.previousContainer.id === commandListDropConainer.id;
    }

    private buildNewCommandDroppend(event: any): CommandDroppedInterface {
        const commandDroppedData: CommandDroppedInterface = {
            containerId: (event.container.element as any).getAttribute('id'),
            previousContainerId: (event.previousContainer.element as any).getAttribute('id'),
            fileId: (event.container.element as any).getAttribute('fileId'),
            itemId: uuid(),
            previousIndex: event.previousIndex,
            currentIndex: event.currentIndex,
            commandType: event.item.data,
            dropType: DropType.New
        };

        return commandDroppedData;
    }

    private handleDropEvent(data: CommandDroppedInterface): void {

        switch (data.dropType) {
            case DropType.New: {
                this.newCommand(data);
                break;
            }
            case DropType.MoveSameList: {
                this.moveSameList(data);
                break;
            }
            case DropType.MoveAnotherList: {
                this.moveAnotherList(data);
            }
        }
    }

    private newCommand(data: CommandDroppedInterface): void {
        const commandContainerList = this.commandsDragDropRepository.getCommandContainerList(data.containerId);
        commandContainerList.splice(data.currentIndex, 0, data);
        this.commandsDragDropRepository.saveCommandContainerList(data.containerId, commandContainerList);
    }

    private moveSameList(data: CommandDroppedInterface) {
        const commandContainerList = this.commandsDragDropRepository.getCommandContainerList(data.containerId);

        this.commandsDragDropRepository.swapDragItems(data.containerId, data.currentIndex, data.previousIndex);
        this.commandDataDragDropService.moveSameList(data);
        moveItemInArray(commandContainerList, data.previousIndex, data.currentIndex);
        this.synchronizeCommandContainerIndex(data.containerId);
    }

    private synchronizeCommandContainerIndex(commandContainerId: string): void {
        const commandContainerList = this.commandsDragDropRepository.getCommandContainerList(commandContainerId);
        for(const index in commandContainerList) {
            commandContainerList[index].currentIndex = +index;
        }
    }

    private moveAnotherList(data: CommandDroppedInterface): void {

        this.moveCommandContainerListToAnotheList(data);

        this.movecurrentCommandViewContainerToAnotherList(data);

        // There is no need to move the drag item, it will be created when the new component is created, we remove it insted
        this.removeDragItem(data);

        // The same goes to the command data
        this.commandDataDragDropService.removeCommandDataFromContainerList(data);

        this.synchronizeCommandContainerIndex(data.previousContainerId);
        this.synchronizeCommandContainerAfterMove(data.containerId, data.currentIndex);
        this.synchronizeCommandContainerIndex(data.containerId);
    }

    private removeDragItem(data: CommandDroppedInterface): void {
        this.commandsDragDropRepository.removeDragItem(data.previousContainerId, data.previousIndex);
        const dropList: DropListRef = this.commandsDragDropRepository.getDropItem(data.previousContainerId);
        const dragList = this.commandsDragDropRepository.getDragList(data.previousContainerId);
        dropList.withItems(dragList);
    }

    private moveCommandContainerListToAnotheList(data: CommandDroppedInterface): void {
        const commandContainerList = this.commandsDragDropRepository.getCommandContainerList(data.containerId);
        const previousCommandContainerList = this.commandsDragDropRepository.getCommandContainerList(data.previousContainerId);
        transferArrayItem(previousCommandContainerList, commandContainerList, data.previousIndex, data.currentIndex);
    }

    private movecurrentCommandViewContainerToAnotherList(data: CommandDroppedInterface): void {
        const currentCommandViewContainer = this.commandsDragDropRepository.getCommandViewContainer(data.containerId);
        const previousCommandViewContainer = this.commandsDragDropRepository.getCommandViewContainer(data.previousContainerId);
        transferArrayItem(
            previousCommandViewContainer.toArray(), currentCommandViewContainer.toArray(), data.previousIndex, data.currentIndex);
    }

    synchronizeCommandContainerAfterMove(currentContainerId: string, currentIndex: number): void {
        const commandContainerList = this.commandsDragDropRepository.getCommandContainerList(currentContainerId);
        if (commandContainerList.length > 0) {
            commandContainerList[currentIndex].containerId = currentContainerId;
            commandContainerList[currentIndex].currentIndex = currentIndex;
            this.commandsDragDropRepository.saveCommandContainerList(currentContainerId, commandContainerList);
        }
    }
}
