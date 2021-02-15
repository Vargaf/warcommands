import { Injectable } from '@angular/core';
import { FileEventListeners } from '../file/file-event-listeners';
import { CommandContainerEventListeners } from '../command-container/command-container-event-listeners';
import { CommandEventListeners } from '../command/command-event-listeners';

@Injectable({
    providedIn: 'root'
})
export class CommandPanelEventListenerAgregatorService {

    constructor(
        private readonly fileEventListeners: FileEventListeners,
        private readonly commandContainerEventListeners: CommandContainerEventListeners,
        private readonly commandEventListeners: CommandEventListeners
    ) {}

}
