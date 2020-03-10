import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, ViewChildren, ViewContainerRef, QueryList } from '@angular/core';
import { CommandContainerNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command-container/command-container-ngrx-repository.service';
import { CommandContainerDTO } from 'src/warcommands/commands-panel/domain/command-container/model/command-container.dto';
import { CommandDragDropManagerService } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/command-drag-drop-manager.service';
import { CommandDirective } from '../command.directive';
import { CommandCreatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-created-events';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';
import { CommandMovedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-moved-events';

@Component({
    selector: 'app-command-drop',
    templateUrl: './command-drop.component.html',
    styleUrls: ['./command-drop.component.scss']
})
export class CommandDropComponent implements OnInit, AfterViewInit {

    @Input()
    commandContainerId: string;

    @ViewChild('commandsDropContainer', { static: true })
    commandsDropContainer: ElementRef<HTMLDivElement>;

    @ViewChildren(CommandDirective, {read: ViewContainerRef})
    public commandContainerView: QueryList<ViewContainerRef>;

    commandContainer: CommandContainerDTO;

    commandList: GenericCommandDTO[] = [];

    constructor(
        private readonly commandContainerNgrxRepositoryService: CommandContainerNgrxRepositoryService,
        private readonly commandDragDropManagerService: CommandDragDropManagerService,
        private readonly commandCreatedEvents: CommandCreatedEvents,
        private readonly commandMovedEvents: CommandMovedEvents,
    ) { }

    ngOnInit() {
        this.commandContainerNgrxRepositoryService.getCommandContainer(this.commandContainerId).subscribe((commandContainer) => {
            this.commandContainer = commandContainer;
        });

        this.setNewCommandDroppedToContainerListener();
        this.setMoveCommandFromCommandContainerListener();
        this.setMoveCommandToCommandContainerListener();
    }

    ngAfterViewInit() {
        this.commandDragDropManagerService.createCommandContainerDrop(this.commandsDropContainer, this.commandContainer);
        this.commandContainerView.changes.subscribe((changeEvent) => {
            this.addCommandComponent(changeEvent);
        });

        this.loadCommandList();
    }

    private setNewCommandDroppedToContainerListener(): void {
        this.commandCreatedEvents.commandAddedToCommandContainerListener(this.commandContainerId).subscribe((event) => {
            this.addCommandWrapper(event.command, event.position);
        });
    }

    private setMoveCommandFromCommandContainerListener(): void {
        this.commandMovedEvents.commandMovedFromCommandContainerListener(this.commandContainerId).subscribe((event) => {
            this.removeCommandWrapper(event.fromPosition);
            this.commandDragDropManagerService.removeCommandComponent(event.command, event.fromContainerId);
        });
    }

    private setMoveCommandToCommandContainerListener(): void {
        this.commandMovedEvents.commandMovedToCommandContainerListener(this.commandContainerId).subscribe((event) => {
            this.addCommandWrapper(event.command, event.toPosition);
        });
    }

    private removeCommandWrapper(position: number): void {
        this.commandList.splice(position, 1);
    }

    private addCommandWrapper(command: GenericCommandDTO, position: number): void {
        this.commandList.splice(position, 0, command);
    }

    private addCommandComponent(changeEvent: QueryList<ViewContainerRef>): void {

        const viewContainerRef = changeEvent.toArray();

        // tslint:disable-next-line: forin
        for (const index in viewContainerRef) {
            const item = viewContainerRef[index];

            if (item.element.nativeElement.parentElement.getAttribute('dirty') === 'true') {
                const command: GenericCommandDTO = this.commandList[index];
                item.element.nativeElement.parentElement.removeAttribute('dirty');

                this.commandDragDropManagerService.createCommandComponent(item, command, +index);

            }
        }

    }

    private loadCommandList(): void {
        const commandList: GenericCommandDTO[] = this.commandContainer.commands;
        // tslint:disable-next-line: forin
        for (const index in commandList) {
            const command = commandList[index];
            this.addCommandWrapper(command, +index);
        }
    }

}
