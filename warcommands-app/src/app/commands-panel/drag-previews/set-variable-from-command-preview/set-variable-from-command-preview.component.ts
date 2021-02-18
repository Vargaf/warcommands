import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-set-variable-from-command-preview',
    templateUrl: './set-variable-from-command-preview.component.html',
    styleUrls: ['./set-variable-from-command-preview.component.scss']
})
export class SetVariableFromCommandPreviewComponent implements OnInit {

    @ViewChild('dragCommandPreview', { static: true })
    public previewTemplateRef!: TemplateRef<NgTemplateOutlet>;

    @ViewChild('dragCommandPreview', { static: true, read: ViewContainerRef })
    public previewViewContainerRed!: ViewContainerRef;

    constructor() { }

    ngOnInit(): void {
    }

    getDragHelperTemplate(): any {
        return {
            template: this.previewTemplateRef,
            viewContainer: this.previewViewContainerRed,
            context: null
        };
    }

}
