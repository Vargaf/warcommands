import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-logic-operator-command-preview',
    templateUrl: './logic-operator-command-preview.component.html',
    styleUrls: ['./logic-operator-command-preview.component.scss']
})
export class LogicOperatorCommandPreviewComponent implements OnInit {

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
