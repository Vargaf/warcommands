import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, Output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DragCustomPreviewService } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/drag-custom-preview.service';

@Component({
    selector: 'app-create-minion-preview',
    templateUrl: './create-minion-preview.component.html',
    styleUrls: ['./create-minion-preview.component.scss']
})
export class CreateMinionPreviewComponent implements OnInit {

    @ViewChild('dragCommandPreview', { static: true })
    public previewTemplateRef: TemplateRef<NgTemplateOutlet>;

    @ViewChild('dragCommandPreview', { static: true, read: ViewContainerRef })
    public previewViewContainerRed: ViewContainerRef;

    constructor() { }

    ngOnInit() {
    }

    getDragHelperTemplate(): any {
        return {
            template: this.previewTemplateRef,
            viewContainer: this.previewViewContainerRed,
            context: null
        };
    }

}
