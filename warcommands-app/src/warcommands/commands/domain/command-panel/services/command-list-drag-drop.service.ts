import { Injectable, ElementRef } from '@angular/core';
import { CommandsDragDropRepositoy } from 'src/warcommands/commands/infrastructure/angular/drag-drop/commands-drag-drop.repository';
import { DragDrop, DragRef, DropListRef } from '@angular/cdk/drag-drop';
import { DragHelperTemplate } from 'src/warcommands/commands/infrastructure/angular/drag-drop/drag-helper-template';
import { CommandType } from '../../command/model/command-type.enum';
import { v4 as uuid } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class CommandListDragDropService {

    readonly commandListContainerId: string;

    constructor(
        private readonly commandsDragDropRepository: CommandsDragDropRepositoy,
        private readonly angularDragDropService: DragDrop
    ) {
        this.commandListContainerId = uuid();
    }

    createCommandListDrop(element: ElementRef): void {
        const dropList = this.angularDragDropService.createDropList(element);
        (dropList.element as any).setAttribute('id', this.commandListContainerId);
        dropList.withItems([]);
        dropList.sortingDisabled = true;
        this.commandsDragDropRepository.saveDropItem(this.commandListContainerId, dropList);
    }

    addDragItem(element: ElementRef, commandType: CommandType, placeHolderTemplate: DragHelperTemplate): void {
        const dragElement: DragRef = this.angularDragDropService.createDrag(element);
        dragElement.data = commandType;
        dragElement.withPlaceholderTemplate(placeHolderTemplate);
        this.commandsDragDropRepository.addDragItem(this.commandListContainerId, 0, dragElement);

        const dropItem = this.commandsDragDropRepository.getDropItem(this.commandListContainerId);
        const dragList = this.commandsDragDropRepository.getDragList(this.commandListContainerId);
        dropItem.withItems(dragList);
    }

    getCommandListDropContainer(): DropListRef {
        return this.commandsDragDropRepository.getDropItem(this.commandListContainerId);
    }

}