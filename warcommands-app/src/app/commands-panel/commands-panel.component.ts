import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, HostListener } from '@angular/core';
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

    @ViewChild('commandsPanelContentElement', { static: true })
    commandsPanelContentElement!: ElementRef<HTMLDivElement>;

    @ViewChild('editorPanelElement')
    commandEditorElement!: ElementRef<HTMLDivElement>;

    isCommandListVisible = true;
    isSmallDevice = false;

    sideButtonBarWidth = 40;
    commandListPanelWidth = 355;
    windowWidth = 0;

    
    constructor(
        private readonly mediaObserver: MediaObserver,
        private readonly uxUiNgrxRepository: UxUiNgrxRepositoryService,
        private readonly toggleCommandListPanelService: ToggleCommandListPanelService,
        private readonly renderer: Renderer2,
    ) { }

    ngOnInit() {}

    ngAfterViewInit() {
        this.uxUiNgrxRepository.watchIsUserDraggingACommandFromCommandList().pipe(skip(1)).subscribe((isDragging: boolean) => {
            if (this.isSmallDevice && isDragging) {
                this.toggleCommandListPanelService.hidePanel();
            }
        });

        this.toggleCommandListPanelService.panelVisibleListener().subscribe((isCommandListVisible: boolean) => {
            this.isCommandListVisible = isCommandListVisible;
            this.updatePanelswidth();
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any):void {
        this.setWindowsSize(event.currentTarget.innerWidth, event.currentTarget.innerHeight);
    }

    @HostListener('window:load', ['$event'])
    onLoad(event: any) {
        this.setWindowsSize(event.currentTarget.innerWidth, event.currentTarget.innerHeight);
    }   

    private setWindowsSize(windowWidth: number, windowHeight:number): void {
        this.uxUiNgrxRepository.loadWindowSize(
            windowWidth,
            windowHeight
        );

        this.windowWidth = windowWidth;
        this.updatePanelswidth();
    }

    private updatePanelswidth(): void {
        if(this.mediaObserver.isActive('lt-md')) {
            this.isSmallDevice = true;

            const panelsWidth = this.windowWidth - this.sideButtonBarWidth;
            this.renderer.setStyle(this.commandListElement.nativeElement, 'width', panelsWidth + 'px');
            this.renderer.setStyle(this.commandEditorElement.nativeElement, 'width', panelsWidth + 'px');
        } else {
            this.isSmallDevice = false;
            let commandEditorPanelWidth = 0;

            if(this.isCommandListVisible) {
                commandEditorPanelWidth = this.windowWidth - this.sideButtonBarWidth - this.commandListPanelWidth;
            } else {
                commandEditorPanelWidth = this.windowWidth - this.sideButtonBarWidth;
            }

            this.renderer.setStyle(this.commandListElement.nativeElement, 'width', this.commandListPanelWidth + 'px');
            this.renderer.setStyle(this.commandEditorElement.nativeElement, 'width', commandEditorPanelWidth + 'px');
        }
    }
}
