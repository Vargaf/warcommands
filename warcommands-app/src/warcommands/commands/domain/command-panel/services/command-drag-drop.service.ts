import { Injectable, ViewContainerRef, ComponentRef } from '@angular/core';
import { CommandWrapperDTO } from 'src/warcommands/commands/infrastructure/angular/drag-drop/command-wrapper.dto';
import { AddCommandComponentService } from './add-command-component.service';
import { CommandsDragDropRepositoy } from 'src/warcommands/commands/infrastructure/angular/drag-drop/commands-drag-drop.repository';
import { DragRef, DragDrop, DropListRef } from '@angular/cdk/drag-drop';
import { CommandDataDragDropService } from './command-data-drag-drop.service';
import { CommandInterface } from '../../command/model/command.interface';

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

    addCommandDropped(viewContainerRef: ViewContainerRef, commandDropped: CommandWrapperDTO) {

        let commandData: CommandInterface;
        this.commandDataDragDropService.getCommand(commandDropped.itemId).subscribe((currentCommandData) => {
            commandData = { ...currentCommandData };
            commandData.parentCommandContainerId = commandDropped.containerId;
            commandData.fileId = commandDropped.fileId;
        }).unsubscribe();

        this.addCommand(commandData, viewContainerRef, commandDropped);
    }

    private addCommand(commandData: CommandInterface, viewContainerRef: ViewContainerRef, commandDropped: CommandWrapperDTO): void {


        const component: ComponentRef<any> = this.addCommandComponentService.addComponent(
            viewContainerRef,
            commandData);

        const dragableElement: DragRef = this.createDragableElement(
            component.location.nativeElement.parentElement,
            commandDropped);

        this.commandsDragDropRepository.addDragItem(commandDropped.containerId, commandDropped.currentIndex, dragableElement);

        this.updateDropList(commandDropped.containerId);
        this.synchronizeCommandContainerIndex(commandDropped.containerId);
    }

    private synchronizeCommandContainerIndex(commandContainerId: string): void {
        const commandContainerList = this.commandsDragDropRepository.getCommandWrapperList(commandContainerId);
        // tslint:disable-next-line: forin
        for (const index in commandContainerList) {
            commandContainerList[index].currentIndex = +index;
        }
    }

    private createDragableElement(element: HTMLElement, commandDropped: CommandWrapperDTO): DragRef {
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