import { Injectable, ElementRef, QueryList, ViewContainerRef } from '@angular/core';
import { CommandWrapperDTO } from 'src/warcommands/commands/infrastructure/angular/drag-drop/command-wrapper.dto';
import { CommandContainerDTO } from '../../command-container/model/command-container.dto';
import { DropListRef, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommandsDragDropRepositoy } from 'src/warcommands/commands/infrastructure/angular/drag-drop/commands-drag-drop.repository';
import { CommandListDragDropService } from './command-list-drag-drop.service';
import { Subscription } from 'rxjs';
import { DropType } from 'src/warcommands/commands/infrastructure/angular/drag-drop/drop-type.enum';
import { CommandDragDropService } from './command-drag-drop.service';
import { CommandDataDragDropService } from './command-data-drag-drop.service';
import { CreateCommandComponentService } from './create-command-component.service';
import { CommandDropContainerManager } from './command-drop-container-manager.service';
import { CommandDropedHelperService } from './command-droped-helper.service';

@Injectable({
    providedIn: 'root'
})
export class CommandContainerDragDropService {

    constructor(
        private readonly commandsDragDropRepository: CommandsDragDropRepositoy,
        private readonly commandListDragDropService: CommandListDragDropService,
        private readonly commandDragDropService: CommandDragDropService,
        private readonly commandDataDragDropService: CommandDataDragDropService,
        private readonly createCommandComponentService: CreateCommandComponentService,
        private readonly commandDropContainerManager: CommandDropContainerManager,
        private readonly commandDropedService: CommandDropedHelperService
    ) {}

    createCommandDropContainer(
        commandContainer: CommandContainerDTO,
        dropCommandsContainer: ElementRef,
        commandViewContainer: QueryList<ViewContainerRef>,
        commandContainerList: CommandWrapperDTO[]
    ): void {
        this.commandsDragDropRepository.saveCommandWrapperList(commandContainer.id, commandContainerList);
        this.commandsDragDropRepository.saveCommandViewContainer(commandContainer.id, commandViewContainer);

        const dropList = this.commandDropContainerManager.createCommandDropContainer(dropCommandsContainer);

        this.commandsDragDropRepository.saveDropItem(commandContainer.id, dropList);

        this.connectAllTheDropLists();

        this.setCommandItemContainerSubscribers(commandContainer.id, commandViewContainer);
        this.setCommandContainerListDroppedObserver(dropList);

        for (const command of commandContainer.commands) {
            this.createCommandComponentService.addCommandViewFromFile(command);
        }
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

                const commandContainerList = this.commandsDragDropRepository.getCommandWrapperList(containerId);
                const commandDropped: CommandWrapperDTO = commandContainerList[currentIndex];

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
            let commandWrapper: CommandWrapperDTO ;

            if (this.isANewCommand(event)) {
                commandWrapper = this.commandDropedService.buildNewCommandWrapper(event);
                this.commandDropedService.createNewCommand(commandWrapper);

            } else {
                const commandContainerId = (event.previousContainer.element as any).getAttribute('id');
                const commandDroppedDataList: CommandWrapperDTO[] =
                    this.commandsDragDropRepository.getCommandWrapperList(commandContainerId);
                commandWrapper = commandDroppedDataList[event.previousIndex];

                commandWrapper = this.commandDropedService.updateCommandWrapper(event, commandWrapper);

                commandDroppedDataList[event.previousIndex] = commandWrapper;
                this.commandsDragDropRepository.saveCommandWrapperList(commandContainerId, commandDroppedDataList);
            }

            this.handleDropEvent(commandWrapper);
        });
    }

    private isANewCommand(event: any): boolean {
        const commandListDropConainer = this.commandListDragDropService.getCommandListDropContainer();
        return event.previousContainer.id === commandListDropConainer.id;
    }

    private handleDropEvent(data: CommandWrapperDTO): void {

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

    private newCommand(data: CommandWrapperDTO): void {
        const commandContainerList = this.commandsDragDropRepository.getCommandWrapperList(data.containerId);
        commandContainerList.splice(data.currentIndex, 0, data);
        this.commandsDragDropRepository.saveCommandWrapperList(data.containerId, commandContainerList);
    }

    private moveSameList(data: CommandWrapperDTO) {
        const commandContainerList = this.commandsDragDropRepository.getCommandWrapperList(data.containerId);

        this.commandsDragDropRepository.swapDragItems(data.containerId, data.currentIndex, data.previousIndex);
        this.commandDataDragDropService.moveSameList(data);
        moveItemInArray(commandContainerList, data.previousIndex, data.currentIndex);
        this.synchronizeCommandContainerIndex(data.containerId);
    }

    private synchronizeCommandContainerIndex(commandContainerId: string): void {
        const commandContainerList = this.commandsDragDropRepository.getCommandWrapperList(commandContainerId);

        // tslint:disable-next-line: forin
        for (const index in commandContainerList) {
            commandContainerList[index].currentIndex = +index;
        }
    }

    private moveAnotherList(data: CommandWrapperDTO): void {

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

    private removeDragItem(data: CommandWrapperDTO): void {
        this.commandsDragDropRepository.removeDragItem(data.previousContainerId, data.previousIndex);
        const dropList: DropListRef = this.commandsDragDropRepository.getDropItem(data.previousContainerId);
        const dragList = this.commandsDragDropRepository.getDragList(data.previousContainerId);
        dropList.withItems(dragList);
    }

    private moveCommandContainerListToAnotheList(data: CommandWrapperDTO): void {
        const commandContainerList = this.commandsDragDropRepository.getCommandWrapperList(data.containerId);
        const previousCommandContainerList = this.commandsDragDropRepository.getCommandWrapperList(data.previousContainerId);
        transferArrayItem(previousCommandContainerList, commandContainerList, data.previousIndex, data.currentIndex);
    }

    private movecurrentCommandViewContainerToAnotherList(data: CommandWrapperDTO): void {
        const currentCommandViewContainer = this.commandsDragDropRepository.getCommandViewContainer(data.containerId);
        const previousCommandViewContainer = this.commandsDragDropRepository.getCommandViewContainer(data.previousContainerId);
        transferArrayItem(
            previousCommandViewContainer.toArray(), currentCommandViewContainer.toArray(), data.previousIndex, data.currentIndex);
    }

    synchronizeCommandContainerAfterMove(currentContainerId: string, currentIndex: number): void {
        const commandContainerList = this.commandsDragDropRepository.getCommandWrapperList(currentContainerId);
        if (commandContainerList.length > 0) {
            commandContainerList[currentIndex].containerId = currentContainerId;
            commandContainerList[currentIndex].currentIndex = currentIndex;
            this.commandsDragDropRepository.saveCommandWrapperList(currentContainerId, commandContainerList);
        }
    }
}
