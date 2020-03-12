import { Injectable, ElementRef } from '@angular/core';
import { CommandDropRepository } from '../../command-drag-drop/services/command-drop-repository.service';
import { DragDrop, DropListRef, DragRef } from '@angular/cdk/drag-drop';

@Injectable({
    providedIn: 'root'
})
export class CommandRemoveManagerService {

    private readonly deleteCommandDropContianerIndex = 'delete-container';

    constructor(
        private readonly commandDropRepositoryService: CommandDropRepository,
        private readonly angularDragDropService: DragDrop,
    ) {}

    createDeleteCommandDropContainer(deleteCommandContainerDivElement: ElementRef<HTMLDivElement>): void {
        let deleteCommandDropListRef: DropListRef = this.angularDragDropService.createDropList(deleteCommandContainerDivElement);
        deleteCommandDropListRef.withItems([]);
        deleteCommandDropListRef.withOrientation('horizontal');
        deleteCommandDropListRef.withDirection('ltr');
        deleteCommandDropListRef = this.disableDropEventToCommandList(deleteCommandDropListRef);
        deleteCommandDropListRef = this.onEnterdEvent(deleteCommandDropListRef);
        deleteCommandDropListRef = this.onExited(deleteCommandDropListRef);

        const dropItemList = this.commandDropRepositoryService.getDropItemList();
        deleteCommandDropListRef.connectedTo(dropItemList);

        this.commandDropRepositoryService.save(deleteCommandDropListRef, this.deleteCommandDropContianerIndex);
        this.setDeleteCommandDropContainerDroppedObserver(deleteCommandDropListRef);
    }

    getDeleteCommandDropContainer(): DropListRef {
        return this.commandDropRepositoryService.getDropItem(this.deleteCommandDropContianerIndex);
    }

    private setDeleteCommandDropContainerDroppedObserver(dropListRef: DropListRef): void {
        dropListRef.dropped.subscribe(event => {
            console.log(event);
        });
    }

    private disableDropEventToCommandList(dropListRef: DropListRef): DropListRef {
        dropListRef.enterPredicate = (dragItem: DragRef, dropList: DropListRef) => {
            return !(dragItem as any)._initialContainer.element.hasAttribute('iscommandlistdropcontainer');
        };

        return dropListRef;
    }

    private onEnterdEvent(dropListRef: DropListRef): DropListRef {
        dropListRef.entered.subscribe((event) => {
            console.log(event);
            (event.container.element as any).classList.add('with-element-to-remove');
        });

        return dropListRef;
    }

    private onExited(dropListRef: DropListRef): DropListRef {
        dropListRef.exited.subscribe((event) => {
            (event.container.element as any).classList.remove('with-element-to-remove');
        });

        return dropListRef;
    }

}
