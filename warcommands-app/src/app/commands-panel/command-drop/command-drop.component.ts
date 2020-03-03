import { Component, OnInit, ViewChild, ElementRef, ViewChildren, ViewContainerRef, QueryList, Input, AfterViewInit } from '@angular/core';
import { CommandDirective } from '../command.directive';
import { CommandWrapperDTO } from 'src/warcommands/commands/infrastructure/angular/drag-drop/command-wrapper.dto';
import { CommandContainerDragDropService } from 'src/warcommands/commands/domain/command-panel/services/command-container-drag-drop.service';
import { CommandContainerDTO } from 'src/warcommands/commands/domain/command-container/model/command-container.dto';
import { CommandContainerRepositoryService } from 'src/warcommands/commands/domain/command-container/services/command-container-repository.service';

@Component({
    selector: 'app-command-drop',
    templateUrl: './command-drop.component.html',
    styleUrls: ['./command-drop.component.scss']
})
export class CommandDropComponent implements OnInit, AfterViewInit {

    @Input()
    commandContainerId: string;

    @Input()
    fileId: string;

    @ViewChild('commandsDropContainer', { static: true })
    public commandsDropContainer: ElementRef<HTMLDivElement>;

    @ViewChildren(CommandDirective, {read: ViewContainerRef})
    public commandContainerView: QueryList<ViewContainerRef>;

    public commandList: CommandWrapperDTO[] = [];

    public commandContainerDTO: CommandContainerDTO;

    constructor(
        private readonly commandContainerDragDropService: CommandContainerDragDropService,
        private readonly commandContainerRepository: CommandContainerRepositoryService,
    ) { }

    ngOnInit() {
        this.commandContainerRepository.getCommandContainer(this.commandContainerId).subscribe((commandContainer) => {
            this.commandContainerDTO = commandContainer;
        });
    }

    ngAfterViewInit() {

        this.commandContainerDragDropService.createCommandDropContainer(
            this.commandContainerDTO,
            this.commandsDropContainer,
            this.commandContainerView,
            this.commandList
        );
    }
}
