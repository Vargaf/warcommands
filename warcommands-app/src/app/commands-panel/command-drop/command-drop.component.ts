import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, ViewChildren, ViewContainerRef, QueryList } from '@angular/core';
import { CommandContainerNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command-container/command-container-ngrx-repository.service';
import { CommandContainerDTO } from 'src/warcommands/commands-panel/domain/command-container/model/command-container.dto';
import { CommandDragDropManagerService } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/command-drag-drop-manager.service';
import { CommandDragDropManagerEvents } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/command-drag-drop-manager-events';
import { CommandWrapperDTO } from 'src/warcommands/commands-panel/domain/command-drag-drop/model/command-wrapper.dto';
import { CommandDirective } from '../command.directive';

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

    commandWrapperList: CommandWrapperDTO[] = [];

    constructor(
        private readonly commandContainerNgrxRepositoryService: CommandContainerNgrxRepositoryService,
        private readonly commandDragDropManagerService: CommandDragDropManagerService,
        private readonly commandDragDropManagerEvents: CommandDragDropManagerEvents,
    ) { }

    ngOnInit() {
        this.commandContainerNgrxRepositoryService.getCommandContainer(this.commandContainerId).subscribe((commandContainer) => {
            this.commandContainer = commandContainer;
        });

        this.setNewCommandDroppedListener();
        this.setMoveCommandListener();
    }

    ngAfterViewInit() {
        this.commandDragDropManagerService.createCommandContainerDrop(this.commandsDropContainer, this.commandContainer);
        this.commandContainerView.changes.subscribe((changeEvent) => {
            this.addCommandComponent(changeEvent);
        });
    }

    private setNewCommandDroppedListener(): void {
        this.commandDragDropManagerEvents.newCommandDroppedListener(this.commandContainerId).subscribe((commandWrapperDTO) => {
            this.addCommandWrapper(commandWrapperDTO);
            this.synchronizeCommandContainerIndex();
        });
    }

    private setMoveCommandListener(): void {
        this.commandDragDropManagerEvents.moveCommandDroppedListener(this.commandContainerId).subscribe((commandWrapperDTO) => {
            this.removeCommandWrapper(commandWrapperDTO);
            this.commandDragDropManagerService.removeCommandComponent(commandWrapperDTO);
            this.addCommandWrapper(commandWrapperDTO);
            this.synchronizeCommandContainerIndex();
        });
    }

    private removeCommandWrapper(commandWrapperDTO: CommandWrapperDTO): void {
        this.commandWrapperList.splice(commandWrapperDTO.previousIndex, 1);
    }

    private addCommandWrapper(commandWrapperDTO: CommandWrapperDTO): void {
        this.commandWrapperList.splice(commandWrapperDTO.currentIndex, 0, commandWrapperDTO);
    }

    private synchronizeCommandContainerIndex(): void {
        // tslint:disable-next-line: forin
        for (const index in this.commandWrapperList) {
            this.commandWrapperList[index].currentIndex = +index;
        }
    }

    private addCommandComponent(changeEvent: QueryList<ViewContainerRef>): void {

        const viewContainerRef = changeEvent.toArray();

        // tslint:disable-next-line: forin
        for (const index in viewContainerRef) {
            const item = viewContainerRef[index];
            const commandWrapper: CommandWrapperDTO = this.commandWrapperList[index];

            if (item.element.nativeElement.parentElement.getAttribute('dirty') === 'true') {
                item.element.nativeElement.parentElement.removeAttribute('dirty');

                this.commandDragDropManagerService.createCommandComponent(commandWrapper, item);

            }
        }

    }

}
