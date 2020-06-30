import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { UxUiNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/ux-ui/ux-ui-ngrx-repository.service';
import { ToggleCommandsPanelService } from 'src/warcommands/commands-panel/domain/commands-panel/services/toggle-commands-panel.service';
import { GameMiddlewareService } from 'src/warcommands/game-middleware/game-middleware.service';
import { skip } from 'rxjs/operators';

@Component({
    selector: 'app-commands-panel',
    templateUrl: './commands-panel.component.html',
    styleUrls: ['./commands-panel.component.scss']
})
export class CommandsPanelComponent implements OnInit, AfterViewInit {

    @ViewChild('commandListElement')
    commandListElement: ElementRef<HTMLDivElement>;

    @ViewChild('editorPanelElement')
    commandEditorElement: ElementRef<HTMLDivElement>;

    @ViewChild('commandsEditorPanelElement')
    commandsEditorPanelElement: ElementRef<HTMLDivElement>;

    @ViewChild('commandsPanelContentElement', { static: true })
    commandsPanelContentElement: ElementRef<HTMLDivElement>;

    isCommandListVisible = false;
    isEditorMoved = false;
    isGamePaused = true;

    commandListCollapsibleClass = 'extend-bar';
    editorMovedClass = 'move-editor-panel';

    constructor(
        private readonly renderer: Renderer2,
        private readonly mediaObserver: MediaObserver,
        private readonly uxUiNgrxRepository: UxUiNgrxRepositoryService,
        private readonly toggleCommandsPanelService: ToggleCommandsPanelService,
        private readonly gameMiddlewareService: GameMiddlewareService,
    ) { }

    ngOnInit() {
        
        this.mediaObserver.media$.subscribe((change: MediaChange) => {
            this.setCommandListMediaQueryClases();
        });
    }

    ngAfterViewInit() {
        this.setWindowsSize();

        this.uxUiNgrxRepository.watchIsUserDraggingACommandFromCommandList().pipe(skip(1)).subscribe((isDragging: boolean) => {
            if (!this.isScreenAtLeastMediumSize() && isDragging) {
                this.toggleCommandList();
            }
        });
    }

    toggleCommandList(): void {

        if (!this.isCommandListVisible) {
            this.isCommandListVisible = true;
            
            if (this.isScreenAtLeastMediumSize()) {
                this.isEditorMoved = true;
                this.renderer.addClass(this.commandEditorElement.nativeElement, this.editorMovedClass);
            }
            
            this.renderer.addClass(this.commandListElement.nativeElement, this.commandListCollapsibleClass);
            
        } else {
            this.isCommandListVisible = false;

            if (this.isScreenAtLeastMediumSize()) {
                this.isEditorMoved = false;
                this.renderer.removeClass(this.commandEditorElement.nativeElement, this.editorMovedClass);
            }

            this.renderer.removeClass(this.commandListElement.nativeElement, this.commandListCollapsibleClass);
        }
    }

    onResize(event: Event): void {
        this.setWindowsSize();
    }

    hideCommandsPanel(): void {
        this.toggleCommandsPanelService.hidePanel();
    }

    onPauseGame(): void {
        this.isGamePaused = true;
        this.gameMiddlewareService.pauseGame();
    }

    onResumeGame(): void {
        this.isGamePaused = false;
        this.gameMiddlewareService.resumeGame();
    }

    private setWindowsSize(): void {
        const windowWidth = this.commandsPanelContentElement.nativeElement.clientWidth
        const windowHeight = this.commandsPanelContentElement.nativeElement.clientHeight;
        this.uxUiNgrxRepository.loadWindowSize(
            windowWidth,
            windowHeight
        );

        const activityBarWidth = 44;

        this.renderer.setStyle(this.commandsEditorPanelElement.nativeElement, 'width', windowWidth - activityBarWidth + 'px');
    }






    private setCommandListMediaQueryClases(): void {
        if (this.isEditorMoved && !this.isScreenAtLeastMediumSize()) {
            this.isEditorMoved = false;
            this.renderer.removeClass(this.commandEditorElement.nativeElement, this.editorMovedClass);
        } else {
            if (this.isScreenAtLeastMediumSize() && this.isCommandListVisible && !this.isEditorMoved) {
                this.isEditorMoved = true;
                this.renderer.addClass(this.commandEditorElement.nativeElement, this.editorMovedClass);
            }
        }
    }

    private isScreenAtLeastMediumSize(): boolean {
        return this.mediaObserver.isActive('gt-md')
    }

}
