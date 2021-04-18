import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { UxUiNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/ux-ui/ux-ui-ngrx-repository.service';
import { skip } from 'rxjs/operators';
import { ToggleCommandListPanelService } from 'src/warcommands/commands-panel/domain/commands-panel/services/toggle-command-list-panel.service';

@Component({
    selector: 'app-commands-panel',
    templateUrl: './commands-panel.component.html',
    styleUrls: ['./commands-panel.component.scss']
})
export class CommandsPanelComponent implements OnInit, AfterViewInit {

    @ViewChild('commandListElement')
    commandListElement!: ElementRef<HTMLDivElement>;

    @ViewChild('editorPanelElement')
    commandEditorElement!: ElementRef<HTMLDivElement>;

    @ViewChild('commandsEditorPanelElement')
    commandsEditorPanelElement!: ElementRef<HTMLDivElement>;

    @ViewChild('commandsPanelContentElement', { static: true })
    commandsPanelContentElement!: ElementRef<HTMLDivElement>;

    isCommandListVisible = true;
    
    constructor(
        private readonly mediaObserver: MediaObserver,
        private readonly uxUiNgrxRepository: UxUiNgrxRepositoryService,
        private readonly toggleCommandListPanelService: ToggleCommandListPanelService,
    ) { }

    ngOnInit() {}

    ngAfterViewInit() {
        this.setWindowsSize();

        this.uxUiNgrxRepository.watchIsUserDraggingACommandFromCommandList().pipe(skip(1)).subscribe((isDragging: boolean) => {
            if (!this.isScreenAtLeastMediumSize() && isDragging) {
                this.toggleCommandListPanelService.hidePanel();
            }
        });

        this.toggleCommandListPanelService.panelVisibleListener().subscribe((isCommandListVisible: boolean) => {
            this.isCommandListVisible = isCommandListVisible;
        });
    }

    onResize(event: Event): void {
        this.setWindowsSize();
    }

    private setWindowsSize(): void {
        const windowWidth = this.commandsPanelContentElement.nativeElement.clientWidth
        const windowHeight = this.commandsPanelContentElement.nativeElement.clientHeight;
        this.uxUiNgrxRepository.loadWindowSize(
            windowWidth,
            windowHeight
        );
    }

    private isScreenAtLeastMediumSize(): boolean {
        return this.mediaObserver.isActive('gt-md')
    }

}
