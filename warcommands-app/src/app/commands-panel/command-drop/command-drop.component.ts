import { Component, OnInit, ViewChild, ElementRef, ViewChildren, ViewContainerRef, QueryList, Input, AfterViewInit } from '@angular/core';
import { CommandDirective } from '../command.directive';
import { CommandDroppedInterface } from 'src/warcommands/commands/infrastructure/angular/drag-drop/command-droped';
import { CommandContainerDragDropService } from 'src/warcommands/commands/domain/command-panel/services/command-container-drag-drop.service';
import { CommandContainerDTO } from 'src/warcommands/commands/domain/command-container/model/command-container.dto';

@Component({
    selector: 'app-command-drop',
    templateUrl: './command-drop.component.html',
    styleUrls: ['./command-drop.component.scss']
})
export class CommandDropComponent implements OnInit, AfterViewInit {

    @Input()
    commandContainerId: string;

    @Input()
    pageId: string;

    @ViewChild('commandsDropContainer', { static: true })
    public commandsDropContainer: ElementRef<HTMLDivElement>;

    @ViewChildren(CommandDirective, {read: ViewContainerRef})
    public commandContainer: QueryList<ViewContainerRef>;

    public commandList: CommandDroppedInterface[] = [];

    constructor(
        private readonly commandContainerDragDropService: CommandContainerDragDropService
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {

        if (this.pageId) {

            const commandContainer: CommandContainerDTO = {
                id: this.commandContainerId,
                pageId: this.pageId,
                commands: []
            };
            this.commandContainerDragDropService.createCommandDropContainer(
                commandContainer,
                this.commandsDropContainer,
                this.commandContainer,
                this.commandList
            );
        }
    }
}
