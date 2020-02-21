import { Injectable, ViewContainerRef, ComponentRef } from '@angular/core';
import { CommandDroppedInterface } from 'src/warcommands/commands/infrastructure/angular/drag-drop/command-droped';
import { AddCommandComponentService } from './add-command-component.service';
import { CommandsDragDropRepositoy } from 'src/warcommands/commands/infrastructure/angular/drag-drop/commands-drag-drop.repository';
import { DragRef, DragDrop, DropListRef } from '@angular/cdk/drag-drop';
import { CommandDataFactory } from './command-data.factory';
import { CommandDataDragDropService } from './command-data-drag-drop.service';
import { CommandInterface } from '../../command/model/command.interface';
import { DropType } from 'src/warcommands/commands/infrastructure/angular/drag-drop/drop-type.enum';

@Injectable({
    providedIn: 'root'
})
export class CommandDragDropService {

    constructor(
        private readonly addCommandComponentService: AddCommandComponentService,
        private readonly commandsDragDropRepository: CommandsDragDropRepositoy,
        private readonly angularDragDropService: DragDrop,
        private readonly commandDataDragDropService: CommandDataDragDropService
    ) {}

    addCommandDropped(viewContainerRef: ViewContainerRef, commandDropped: CommandDroppedInterface) {

        let commandData: CommandInterface;

        if (commandDropped.dropType === DropType.New) {
            commandData = CommandDataFactory.getCommandObject(commandDropped);
            this.addCommand(commandData, viewContainerRef, commandDropped);
        } else {
            this.commandDataDragDropService.getCommand(commandDropped.itemId).subscribe((currentCommandData) => {
                commandData = { ...currentCommandData };
                commandData.commandContainerId = commandDropped.containerId;
                commandData.pageId = commandDropped.pageId;
            }).unsubscribe();

            this.addCommand(commandData, viewContainerRef, commandDropped);
        }
    }

    private addCommand(commandData: CommandInterface, viewContainerRef: ViewContainerRef, commandDropped: CommandDroppedInterface): void {


        const component: ComponentRef<any> = this.addCommandComponentService.addComponent(
            viewContainerRef,
            commandData);

        const dragableElement: DragRef = this.createDragableElement(
            component.location.nativeElement.parentElement,
            commandDropped);

        this.commandsDragDropRepository.addDragItem(commandDropped.containerId, commandDropped.currentIndex, dragableElement);

        this.updateDropList(commandDropped.containerId);
        this.synchronizeCommandContainerIndex(commandDropped.containerId);

        this.commandDataDragDropService.saveCommand(commandData, commandDropped.currentIndex);
    }

    private synchronizeCommandContainerIndex(commandContainerId: string): void {
        const commandContainerList = this.commandsDragDropRepository.getCommandContainerList(commandContainerId);
        for (const index in commandContainerList) {
            commandContainerList[index].currentIndex = +index;
        }
    }

    private createDragableElement(element: HTMLElement, commandDropped: CommandDroppedInterface): DragRef {
        const dragableElement: DragRef = this.angularDragDropService.createDrag(element);
        dragableElement.data = commandDropped.commandType;

        return dragableElement;
    }

    private updateDropList(commandContainerId: string): void {
        const dragList: DragRef[] = this.commandsDragDropRepository.getDragList(commandContainerId);
        const dropList: DropListRef = this.commandsDragDropRepository.getDropItem(commandContainerId);
        dropList.withItems(dragList);
        this.commandsDragDropRepository.saveDropItem(commandContainerId, dropList);
    }
}