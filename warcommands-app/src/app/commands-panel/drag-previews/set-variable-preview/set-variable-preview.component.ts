import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-set-variable-preview',
    templateUrl: './set-variable-preview.component.html',
    styleUrls: ['./set-variable-preview.component.scss']
})
export class SetVariablePreviewComponent implements OnInit {

    @ViewChild('dragCommandPreview', { static: true })
    public previewTemplateRef!: TemplateRef<NgTemplateOutlet>;

    @ViewChild('dragCommandPreview', { static: true, read: ViewContainerRef })
    public previewViewContainerRed!: ViewContainerRef;

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
