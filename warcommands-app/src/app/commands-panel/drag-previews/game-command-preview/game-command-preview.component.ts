import { Component, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-game-command-preview',
    templateUrl: './game-command-preview.component.html',
    styleUrls: ['./game-command-preview.component.scss']
})
export class GameCommandPreviewComponent {

    @ViewChild('dragCommandPreview', { static: true })
    public previewTemplateRef!: TemplateRef<NgTemplateOutlet>;

    @ViewChild('dragCommandPreview', { static: true, read: ViewContainerRef })
    public previewViewContainerRed!: ViewContainerRef;

    constructor() { }

    getDragHelperTemplate(): any {
        return {
            template: this.previewTemplateRef,
            viewContainer: this.previewViewContainerRed,
            context: null
        };
    }

}
