import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-if-then-preview',
    templateUrl: './if-then-preview.component.html',
    styleUrls: ['./if-then-preview.component.scss']
})
export class IfThenPreviewComponent implements OnInit {

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
