import { Injectable } from '@angular/core';
import { CommandDropRepository } from './command-drop-repository.service';

@Injectable({
    providedIn: 'root'
})
export class MouseDragDropHelperService {

    activeContainerId: string;

    constructor(
        private readonly commandsDropRepository: CommandDropRepository
    ) {}

    saveActiveCommandContainer(event: MouseEvent) {

        // tslint:disable-next-line: forin
        for (const index in (event as any).path) {
            const item = (event as any).path[index];

            if (item.hasAttribute && item.hasAttribute('MouseHelperDetectorCommandContainerId')) {

                const commandContainerId = item.getAttribute('MouseHelperDetectorCommandContainerId');
                if (commandContainerId !== this.activeContainerId) {
                    this.desactivateThePreviousCommandContainer(this.activeContainerId);
                    this.activateTheCurrentCommandContainer(commandContainerId);
                    this.activeContainerId = commandContainerId;
                }

                break;
            }
        }
    }

    private desactivateThePreviousCommandContainer(commandContainerId: string): void {
        if (commandContainerId) {
            const dropItem = this.commandsDropRepository.getDropItem(commandContainerId);
            dropItem.disabled = true;
        }
    }

    private activateTheCurrentCommandContainer(commandContainerId: string): void {
        const dropItem = this.commandsDropRepository.getDropItem(commandContainerId);
        dropItem.disabled = false;
    }
}
