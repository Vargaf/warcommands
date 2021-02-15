import { DropListRef } from '@angular/cdk/drag-drop';

export abstract class CommandDropRepository {

    abstract save(commandListDrop: DropListRef, commandContainerId: string): void;

    abstract getDropItem(commandContainerId: string): DropListRef;

    abstract getDropItemList(): DropListRef[];

}
