import { Injectable } from '@angular/core';
import { FileEventListeners } from '../file/file-event-listeners';
import { CommandContainerEventListeners } from '../command-container/command-container-event-listeners';

@Injectable({
    providedIn: 'root'
})
export class CommandPanelEventListenerAgregatorService {

    constructor(
        private readonly fileEventListeners: FileEventListeners,
        private readonly commandContainerEventListeners: CommandContainerEventListeners
    ) {}

}