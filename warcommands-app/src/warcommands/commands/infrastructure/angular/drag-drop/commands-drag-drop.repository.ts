import { Injectable, QueryList, ViewContainerRef } from '@angular/core';
import { DropListRef, DragRef, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommandWrapperDTO } from './command-wrapper.dto';
import { Subscription } from 'rxjs';

interface DropItem {
    [id: string]: DropListRef;
}

interface DragItem {
    [id: string]: DragRef[];
}

interface CommandWrapperItem {
    [id: string]: CommandWrapperDTO[];
}

interface CommandContainerSubscriptionItem {
    [id: string]: Subscription;
}

interface CommandViewContainerItem {
    [id: string]: QueryList<ViewContainerRef>;
}

@Injectable({
    providedIn: 'root'
})
export class CommandsDragDropRepositoy {

    private dropItemList: DropListRef[] = [];
    private dragItemList: DragItem[][] = [];
    private commandWrapperList: CommandWrapperItem[] = [];
    private CommandContainerSubscriptionList: CommandContainerSubscriptionItem[] = [];
    private commandViewContainerList: CommandViewContainerItem[] = [];

    saveDropItem(commandContainerId: string, dropItem: DropListRef): void {
        if (this.dragItemList[commandContainerId] === undefined) {
            this.dragItemList[commandContainerId] = [];
        }
        this.dropItemList.push(dropItem);
    }

    getDropItem(commandContainerId: string): DropListRef {
        const dropItemList: DropListRef = this.dropItemList.find((item) => {
            return (item.element as any).getAttribute('id') === commandContainerId;
        });
        return dropItemList;
    }

    getDropItemList(): any[] {
        return this.dropItemList;
    }

    saveCommandWrapperList(commandContainerId: string, commandContainerItem: CommandWrapperDTO[]): void {
        this.commandWrapperList[commandContainerId] = commandContainerItem;
    }

    getCommandWrapperList(commandContainerId: string): CommandWrapperDTO[] {
        return this.commandWrapperList[commandContainerId];
    }

    saveCommandViewContainer(commandContainerId: string, commandViewContainerItem: QueryList<ViewContainerRef>): void {
        this.commandViewContainerList[commandContainerId] = commandViewContainerItem;
    }

    getCommandViewContainer(commandContainerId: string): QueryList<ViewContainerRef> {
        return this.commandViewContainerList[commandContainerId];
    }

    saveCommandContainerSubscriptionItem(commandContainerId: string, subscriptionItem: Subscription): void {
        this.CommandContainerSubscriptionList[commandContainerId] = subscriptionItem;
    }

    getCommandContainerSubscriptionItem(commandContainerId: string): Subscription {
        return this.CommandContainerSubscriptionList[commandContainerId];
    }

    addDragItem(commandContainerId: string, currentIndex: number, dragItem: DragRef): void {
        if (this.dragItemList[commandContainerId] === undefined) {
            this.dragItemList[commandContainerId] = [];
        }
        this.dragItemList[commandContainerId].splice(currentIndex, 0, dragItem);
    }

    getDragList(commandContainerId: string): DragRef[] {
        return this.dragItemList[commandContainerId];
    }

    swapDragItems(commandContainerId: string, currentIndex: number, previousIndex: number): void {
        moveItemInArray(this.dragItemList[commandContainerId], previousIndex, currentIndex);
    }

    removeDragItem(commandContainerId: string, index: number): void {
        const dragItemList: DragRef[] = this.dragItemList[commandContainerId];
        dragItemList.splice(index, 1);
    }

}
