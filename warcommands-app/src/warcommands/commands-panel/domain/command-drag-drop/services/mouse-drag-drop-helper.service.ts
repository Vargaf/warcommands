import { DropListRef } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { CommandDropRepository } from './command-drop-repository.service';

@Injectable({
    providedIn: 'root'
})
export class MouseDragDropHelperService {

    activeContainerId: string | null = null;

    constructor(
        private readonly commandsDropRepository: CommandDropRepository
    ) { }

    saveActiveCommandContainerByMouse(event: MouseEvent) {
        this.setActiveCommandContainer((event as any).path);
    }

    saveActiveCommandContainerByTouchDevice(event: TouchEvent): void {
        const documentElement = (event as any).path[(event as any).path.length - 2];
        const xCoordinate = event.touches[0].pageX;
        const yCoordinate = event.touches[0].pageY;
        const path = documentElement.elementsFromPoint(xCoordinate, yCoordinate);
        this.setActiveCommandContainer(path);
    }

    private setActiveCommandContainer(path: any[]): void {

        if (path.length > 0) {
            const index = 0;

            //for (const index in path) {
            const item = path[index];
            if (item.hasAttribute && item.hasAttribute('MouseHelperDetectorCommandContainerId')) {
                const commandContainerId = item.getAttribute('MouseHelperDetectorCommandContainerId');
                if (commandContainerId !== this.activeContainerId) {
                    this.activeContainerId = commandContainerId;

                    const dropList: DropListRef[] = this.commandsDropRepository.getDropItemList();

                    for (let dropItem of dropList) {
                        const dropListItem = dropItem as any;
                        dropListItem._cacheParentPositions();
                    }
                }

                //        break;
            }
            //}
        }
    }
}
