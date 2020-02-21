import { Component, OnInit, ViewChild, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { CommandType } from 'src/warcommands/commands/domain/command/model/command-type.enum';
import { NgTemplateOutlet } from '@angular/common';
import { CommandListDragDropService } from 'src/warcommands/commands/domain/command-panel/services/command-list-drag-drop.service';

@Component({
    selector: 'app-commands-panel',
    templateUrl: './commands-panel.component.html',
    styleUrls: ['./commands-panel.component.scss']
})
export class CommandsPanelComponent implements OnInit {

    commandType = CommandType;

    @ViewChild('commandsList', { static: true })
    public commandsList: ElementRef<HTMLDivElement>;

    @ViewChild('minionCommand', { static: true })
    public minionCommand: ElementRef<HTMLDivElement>;

    @ViewChild('variableCommand', { static: true })
    public variableCommand: ElementRef<HTMLDivElement>;

    @ViewChild('setVariableCommand', { static: true })
    public setVariableCommand: ElementRef<HTMLDivElement>;

    @ViewChild('ifThenCommand', { static: true })
    public ifThenCommand: ElementRef<HTMLDivElement>;

    @ViewChild('ifThenElseCommand', { static: true })
    public ifThenElseCommand: ElementRef<HTMLDivElement>;


    @ViewChild('noPreview', { static: true })
    public noTemplate: TemplateRef<NgTemplateOutlet>;

    @ViewChild('noPreview', { static: true, read: ViewContainerRef })
    public noTemplateVR: ViewContainerRef;

    constructor(
        private readonly commandListDragDropService: CommandListDragDropService
    ) { }

    ngOnInit() {
        this.commandListDragDropService.createCommandListDrop(this.commandsList);
        this.createDragItemsList();
    }

    private createDragItemsList(): void {
        const noTemplate = {
            template: this.noTemplate,
            viewContainer: this.noTemplateVR,
            context: null
        };

        this.commandListDragDropService.addDragItem(this.minionCommand, CommandType.CreateMinion, noTemplate);
        this.commandListDragDropService.addDragItem(this.variableCommand, CommandType.Variable, noTemplate);
        this.commandListDragDropService.addDragItem(this.setVariableCommand, CommandType.SetVariable, noTemplate);
        this.commandListDragDropService.addDragItem(this.ifThenCommand, CommandType.IfThen, noTemplate);
        this.commandListDragDropService.addDragItem(this.ifThenElseCommand, CommandType.IfThenElse, noTemplate);
    }
}
