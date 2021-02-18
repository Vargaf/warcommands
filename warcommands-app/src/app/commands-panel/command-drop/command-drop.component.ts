import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, ViewChildren, ViewContainerRef, QueryList, OnDestroy } from '@angular/core';
import { CommandContainerNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command-container/command-container-ngrx-repository.service';
import { CommandContainerDTO } from 'src/warcommands/commands-panel/domain/command-container/model/command-container.dto';
import { CommandDragDropManagerService } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/command-drag-drop-manager.service';
import { CommandDirective } from '../command.directive';
import { CommandCreatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-created-events';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';
import { CommandMovedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-moved-events';
import { CommandRepositoryService } from 'src/warcommands/commands-panel/domain/command/services/command-repository.service';
import { Subscription } from 'rxjs';
import { CommandRemovedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-removed-events';
import { ContentObserver } from '@angular/cdk/observers';

@Component({
    selector: 'app-command-drop',
    templateUrl: './command-drop.component.html',
    styleUrls: ['./command-drop.component.scss']
})
export class CommandDropComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input()
    commandContainerId!: string;

    @Input()
    fileContentElement!: HTMLElement;

    @Input()
    isSingleCommand = false;

    @ViewChild('commandsDropContainer', { static: true })
    commandsDropContainer!: ElementRef<HTMLDivElement>;

    @ViewChild('commandsEditorElement', { static: true })
    commandsEditorElement!: ElementRef<HTMLDivElement>;

    @ViewChildren(CommandDirective, {read: ViewContainerRef})
    public commandContainerView!: QueryList<ViewContainerRef>;

    commandContainer!: CommandContainerDTO;
    numberOfLines: Array<number> =[];

    commandList: GenericCommandDTO[] = [];

    private subscribers: Subscription[] = [];

    constructor(
        private readonly commandContainerNgrxRepositoryService: CommandContainerNgrxRepositoryService,
        private readonly commandDragDropManagerService: CommandDragDropManagerService,
        private readonly commandCreatedEvents: CommandCreatedEvents,
        private readonly commandMovedEvents: CommandMovedEvents,
        private readonly commandRemovedEvents: CommandRemovedEvents,
        private readonly commandRepositoryService: CommandRepositoryService,
        private readonly contentObserver: ContentObserver
    ) { }

    ngOnInit() {
        const subscription = this.commandContainerNgrxRepositoryService.getCommandContainer(this.commandContainerId).subscribe((commandContainer) => {
            this.commandContainer = commandContainer;
        });
        this.subscribers.push(subscription);

        this.setNewCommandDroppedToContainerListener();
        this.setMoveCommandFromCommandContainerListener();
        this.setMoveCommandToCommandContainerListener();
        this.setRemovedCommandFromContainerListener();
        this.setCommandEditorContentChangeListener();
    }

    ngAfterViewInit() {

        let scrollableElement!: HTMLElement;
        if (this.fileContentElement) {
            scrollableElement = this.fileContentElement;
        }

        this.commandDragDropManagerService.createCommandContainerDrop(this.commandsDropContainer, this.commandContainer, scrollableElement);
        const subscription = this.commandContainerView.changes.subscribe((changeEvent) => {
            this.addCommandComponent(changeEvent);
        });

        this.loadCommandList();

        this.subscribers.push(subscription);
    }

    ngOnDestroy() {
        for (const subscription of this.subscribers) {
            subscription.unsubscribe();
        }
    }

    private setCommandEditorContentChangeListener(): void {
        if (this.fileContentElement) {
            const subscription = this.contentObserver.observe(this.commandsEditorElement).subscribe((event) => {
                this.refreshNumberLines();
            });

            this.subscribers.push(subscription);
        }
    }

    private setNewCommandDroppedToContainerListener(): void {
        const subscription = this.commandCreatedEvents.commandAddedToCommandContainerListener(this.commandContainerId).subscribe((event) => {
            this.addCommandWrapper(event.command, event.position);
        });
        this.subscribers.push(subscription);
    }

    private setMoveCommandFromCommandContainerListener(): void {
        const subscription = this.commandMovedEvents.commandMovedFromCommandContainerListener(this.commandContainerId).subscribe((event) => {
            this.removeCommandWrapper(event.fromPosition);
            this.commandDragDropManagerService.removeCommandComponent(event.command, event.fromContainerId);
        });
        this.subscribers.push(subscription);
    }

    private setMoveCommandToCommandContainerListener(): void {
        const subscription = this.commandMovedEvents.commandMovedToCommandContainerListener(this.commandContainerId).subscribe((event) => {
            this.addCommandWrapper(event.command, event.toPosition);
        });
        this.subscribers.push(subscription);
    }

    private setRemovedCommandFromContainerListener(): void {
        const subscription = this.commandRemovedEvents.commandRemovedFromCommandContainerListener(this.commandContainerId).subscribe((command) => {
            const position = this.commandList.findIndex((commandItem) => {
                return command.id === commandItem.id;
            })

            this.removeCommandWrapper(position);
            this.commandDragDropManagerService.removeCommandComponent(command, command.parentCommandContainerId);
        });

        this.subscribers.push(subscription);
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
        const commandIdList = this.commandContainer.commands;
        // tslint:disable-next-line: forin
        for (const index in commandIdList) {
            const command = this.commandRepositoryService.findById(commandIdList[index]);
            this.addCommandWrapper(command, +index);
        }
    }

    private refreshNumberLines(): void {
        const bottomPadding = 10;
        const lineHeight = 70;
        const scrollHeight: number = this.commandsEditorElement.nativeElement.offsetHeight - bottomPadding;
        const numberOfLines = Math.ceil(scrollHeight / lineHeight);
        this.numberOfLines = Array(numberOfLines).fill(0).map((x, i) => ++i);
    }

}
