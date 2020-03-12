import { Injectable, ElementRef } from '@angular/core';
import { DropListRef, DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { CommandDropRepository } from './command-drop-repository.service';
import { CommandDraggableElementRepositoryService } from './command-draggable-element-repository.service';
import { CommandType } from '../../command/model/command-type.enum';
import { DragCustomPreviewService } from './drag-custom-preview.service';

@Injectable({
    providedIn: 'root'
})
export class CommandListDragDropManagerService {

    private readonly commandListIndex = 'command-list';

    constructor(
        private readonly commandDropRepositoryService: CommandDropRepository,
        private readonly commandDraggableElementRepositoryService: CommandDraggableElementRepositoryService,
        private readonly angularDragDropService: DragDrop,
        private readonly dragCustomPreviewService: DragCustomPreviewService
    ) {}

    createCommandListDrop(commandListDivElement: ElementRef<HTMLDivElement>): void {
        commandListDivElement.nativeElement.setAttribute('isCommandListDropContainer', 'true');
        let commandListDropRef: DropListRef = this.angularDragDropService.createDropList(commandListDivElement);
        commandListDropRef.withItems([]);
        commandListDropRef.sortingDisabled = true;
        commandListDropRef = this.disableDropEvent(commandListDropRef);

        const dropItemList = this.commandDropRepositoryService.getDropItemList();
        commandListDropRef.connectedTo(dropItemList);

        this.commandDropRepositoryService.save(commandListDropRef, this.commandListIndex);
    }

    addDraggableItem(dragableElement: ElementRef<HTMLDivElement>, commandType: CommandType, position: number): void {

        const dragRefElement: DragRef = this.angularDragDropService.createDrag(dragableElement);
        dragRefElement.data = commandType;

        const previewTemplate = this.dragCustomPreviewService.getDragHelperTemplate(commandType);
        dragRefElement.withPreviewTemplate(previewTemplate);
        dragRefElement.withPlaceholderTemplate(previewTemplate);

        this.commandDraggableElementRepositoryService.addDraggableItemToDragList(dragRefElement, this.commandListIndex, position);

        const dropItem = this.commandDropRepositoryService.getDropItem(this.commandListIndex);
        const dragList = this.commandDraggableElementRepositoryService.getDragList(this.commandListIndex);

        dropItem.withItems(dragList);
        this.commandDropRepositoryService.save(dropItem, this.commandListIndex);
    }

    getCommandListDropContainer(): DropListRef {
        return this.commandDropRepositoryService.getDropItem(this.commandListIndex);
    }

    private disableDropEvent(dropListRef: DropListRef): DropListRef {
        dropListRef.enterPredicate = (dragItem, dropList) => {
            return false;
        };

        return dropListRef;
    }

}
