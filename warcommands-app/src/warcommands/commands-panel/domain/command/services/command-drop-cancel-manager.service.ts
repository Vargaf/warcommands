import { Injectable, ElementRef } from '@angular/core';
import { CommandDropRepository } from '../../command-drag-drop/services/command-drop-repository.service';
import { DragDrop, DragRef, DropListRef } from '@angular/cdk/drag-drop';

@Injectable({
    providedIn: 'root'
})
export class CommandDropCancelManagerService {
    
    private readonly cancelCommandDropContainerIndex = 'cancel-container';

    constructor(
        private readonly commandDropRepositoryService: CommandDropRepository,
        private readonly angularDragDropService: DragDrop,
    ) {}

    createCancelCommandDropContainer(cancelCommandContainerDivElement: ElementRef<HTMLDivElement>, cancelButtonDragElement: ElementRef<HTMLDivElement>): void {
        const buttonDragableElement: DragRef = this.angularDragDropService.createDrag(cancelButtonDragElement);
        buttonDragableElement.disabled = true;
        
        let cancelCommandDropListRef: DropListRef = this.angularDragDropService.createDropList(cancelCommandContainerDivElement);
        cancelCommandDropListRef.withItems([buttonDragableElement]);
        cancelCommandDropListRef.withOrientation('horizontal');
        
        const dropItemList = this.commandDropRepositoryService.getDropItemList();
        cancelCommandDropListRef.connectedTo(dropItemList);

        this.commandDropRepositoryService.save(cancelCommandDropListRef, this.cancelCommandDropContainerIndex);
    }

}