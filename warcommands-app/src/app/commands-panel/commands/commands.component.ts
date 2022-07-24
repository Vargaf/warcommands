import { Component, ViewChild, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommandDragDropManagerService } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/command-drag-drop-manager.service';
import { CommandType } from 'src/warcommands/commands-panel/domain/command/model/command-type.enum';

@Component({
    selector: 'app-commands',
    templateUrl: './commands.component.html',
    styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements AfterViewInit {

    @ViewChildren('command')
    commandList!: QueryList<ElementRef<HTMLDivElement>>;

    @ViewChild('commandListDropContainer', { static: true })
    commandListDropListRef!: ElementRef<HTMLDivElement>;

    commandType = CommandType;

    constructor(
        private readonly commandDragDropManager: CommandDragDropManagerService
    ) { }

    ngAfterViewInit() {

        this.commandDragDropManager.createCommandListDrop(this.commandListDropListRef);

        this.commandList.forEach((commandHtmlElement, index) => {
            const commandType: CommandType = +(<string>commandHtmlElement.nativeElement.getAttribute('commandType'));
            this.commandDragDropManager.addDraggableElementToCommandList(commandHtmlElement, commandType, index);
        });
    }
}
