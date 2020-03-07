import { Injectable } from '@angular/core';
import { CommandDropRepository } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/command-drop-repository.service';
import { DropListRef } from '@angular/cdk/drag-drop';

interface DropListRefItem {
    [index: string]: DropListRef;
}

@Injectable({
    providedIn: 'root'
})
export class AngularCommandDropRepositoryService implements CommandDropRepository {

    private dropContainerList: DropListRefItem = {};

    save(commandListDrop: DropListRef, commandContainerId: string): void {
        this.dropContainerList[commandContainerId] = commandListDrop;
    }

    getDropItem(commandContainerId: string): DropListRef {
        return this.dropContainerList[commandContainerId];
    }

    getDropItemList(): DropListRef[] {
        return Object.values(this.dropContainerList);
    }

}
