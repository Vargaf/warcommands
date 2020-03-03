import { Injectable, ElementRef } from '@angular/core';
import { DropListRef, DragDrop } from '@angular/cdk/drag-drop';
import { MouseDragDropHelperService } from './mouse-drag-drop-helper.service';

@Injectable({
    providedIn: 'root'
})
export class CommandDropContainerManager {

    constructor(
        private readonly angularDragDropService: DragDrop,
        private readonly mouseHelperService: MouseDragDropHelperService,
    ) {}

    createCommandDropContainer(dropCommandsContainer: ElementRef): DropListRef {
        const dropList: DropListRef = this.createDropListContainer(dropCommandsContainer);

        this.setDropAvailavilityFlagListener(dropList);

        return dropList;
    }

    private createDropListContainer(dropCommandsContainer: ElementRef): DropListRef {
        const dropList = this.angularDragDropService.createDropList(dropCommandsContainer);
        dropList.withItems([]);

        return dropList;
    }

    private setDropAvailavilityFlagListener(dropList: DropListRef): void {
        dropList.enterPredicate = (drag, drop) => {
            return (drop.element as any).getAttribute('id') === this.mouseHelperService.activeContainerId;
        };
    }

}
