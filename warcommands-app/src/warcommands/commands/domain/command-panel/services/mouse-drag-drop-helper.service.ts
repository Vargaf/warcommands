import { Injectable } from '@angular/core';
import { CommandsDragDropRepositoy } from 'src/warcommands/commands/infrastructure/angular/drag-drop/commands-drag-drop.repository';

@Injectable({
    providedIn: 'root'
})
export class MouseDragDropHelperService {

    activeContainerId: string;

    constructor(
        private readonly commandsDragDropRepository: CommandsDragDropRepositoy,
    ) {}

    saveActiveCommandContainer(event: MouseEvent) {

        // tslint:disable-next-line: forin
        for (const index in (event as any).path) {
            const item = (event as any).path[index];

            if (item.hasAttribute && item.hasAttribute('MouseHelperDetectorCommandContainerId')) {

                const commandContainerId = item.getAttribute('MouseHelperDetectorCommandContainerId');
                if (commandContainerId !== this.activeContainerId) {
                    let dropItem = this.commandsDragDropRepository.getDropItem(this.activeContainerId);
                    if (dropItem) {
                        dropItem.disabled = true;
                    }

                    dropItem = this.commandsDragDropRepository.getDropItem(commandContainerId);
                    dropItem.disabled = false;

                    this.activeContainerId = commandContainerId;
                }
                break;
            }
        }
    }
}
