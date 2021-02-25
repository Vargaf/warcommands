import { Injectable } from '@angular/core';
import { CommandDraggableElementRepositoryService } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/command-draggable-element-repository.service';
import { DragRef } from '@angular/cdk/drag-drop';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';

interface DragListOnDropContainerItem {
    [index: string]: DragRef[];
}

@Injectable({
    providedIn: 'root'
})
export class AngularCommandDraggableElementRepositoryService implements CommandDraggableElementRepositoryService {
    
    private dragListOnDropContainerList: DragListOnDropContainerItem = {};

    addDraggableItemToDragList(dragableElement: DragRef, commandContainerId: string, position: number): void {
        if (this.dragListOnDropContainerList[commandContainerId] === undefined) {
            this.dragListOnDropContainerList[commandContainerId] = [];
        }
        this.dragListOnDropContainerList[commandContainerId].splice(position, 0, dragableElement);
    }

    getDragList(commandContainerId: string): DragRef[] {
        return this.dragListOnDropContainerList[commandContainerId];
    }

    removeDragItem(command: GenericCommandDTO, commandContainerId: string): void {
        const currentDragList: DragRef[] = this.getDragList(commandContainerId);
        const newDragList: DragRef[] = currentDragList.filter((dragItem) => {
            return dragItem.data.id !== command.id;
        });

        this.dragListOnDropContainerList[commandContainerId] = newDragList;
    }

    getDragItem(command: GenericCommandDTO, commandContainerId: string): DragRef | null{
        const currentDragList: DragRef[] = this.getDragList(commandContainerId);
        const dragItem: DragRef[] = currentDragList.filter((dragItem) => {
            return dragItem.data.id === command.id;
        }); 

        return dragItem[0] || null;
    }

}
