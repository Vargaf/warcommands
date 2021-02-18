import { Injectable, ElementRef } from '@angular/core';
import { CommandDropRepository } from '../../command-drag-drop/services/command-drop-repository.service';
import { DragDrop, DropListRef, DragRef } from '@angular/cdk/drag-drop';
import { CommandRemovalEventChainGeneratorService } from './command-removal-event-chain-generator.service';

@Injectable({
    providedIn: 'root'
})
export class CommandDropRemoveManagerService {

    private readonly deleteCommandDropContainerIndex = 'delete-container';

    constructor(
        private readonly commandDropRepositoryService: CommandDropRepository,
        private readonly angularDragDropService: DragDrop,
        private readonly commandRemovalEventChainGeneratorService: CommandRemovalEventChainGeneratorService
    ) {}

    createDeleteCommandDropContainer(deleteCommandContainerDivElement: ElementRef<HTMLDivElement>, deleteButtonDragElement: ElementRef<HTMLDivElement>): void {
        const buttonDragableElement: DragRef = this.angularDragDropService.createDrag(deleteButtonDragElement);
        buttonDragableElement.disabled = true;
        
        let deleteCommandDropListRef: DropListRef = this.angularDragDropService.createDropList(deleteCommandContainerDivElement);
        deleteCommandDropListRef.withItems([buttonDragableElement]);
        deleteCommandDropListRef.withOrientation('horizontal');
        deleteCommandDropListRef = this.disableDropEventToCommandList(deleteCommandDropListRef);
        
        const dropItemList = this.commandDropRepositoryService.getDropItemList();
        deleteCommandDropListRef.connectedTo(dropItemList);

        this.commandDropRepositoryService.save(deleteCommandDropListRef, this.deleteCommandDropContainerIndex);
        this.setDeleteCommandDropContainerDroppedObserver(deleteCommandDropListRef);
    }

    getDeleteCommandDropContainer(): DropListRef {
        return this.commandDropRepositoryService.getDropItem(this.deleteCommandDropContainerIndex);
    }

    private setDeleteCommandDropContainerDroppedObserver(dropListRef: DropListRef): void {
        dropListRef.dropped.subscribe(event => {
            this.commandRemovalEventChainGeneratorService.generateCommandRemovalEventChain(event.item.data.id);
        });
    }

    private disableDropEventToCommandList(dropListRef: DropListRef): DropListRef {
        dropListRef.enterPredicate = (dragItem: DragRef, dropList: DropListRef) => {
            return !(dragItem as any)._dropContainer.element.hasAttribute('iscommandlistdropcontainer');
        };

        return dropListRef;
    }

}
