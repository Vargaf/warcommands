import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, AfterContentInit } from '@angular/core';
import { FileDTO } from 'src/warcommands/commands-panel/domain/file/model/file.dto';
import { UxUiNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/ux-ui/ux-ui-ngrx-repository.service';

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit, AfterContentInit {

    @Input()
    fileData: FileDTO;

    @ViewChild('fileContentElement')
    fileContentElement: ElementRef<HTMLDivElement>;

    commandContainerId: string;

    constructor(
        private readonly renderer: Renderer2,
        private readonly uxUiNgrxRepository: UxUiNgrxRepositoryService
    ) { }

    ngOnInit() {
        this.commandContainerId = this.fileData.commandContainerId;

        
    }

    ngAfterContentInit() {
        this.uxUiNgrxRepository.watchWindowsSize().subscribe((windowSize) => {
            if (windowSize) {
                setTimeout(() => {
                    const upperBarHeight = 160;
                    const fileContentElementHeight = windowSize.height - upperBarHeight;
                    this.renderer.setStyle(this.fileContentElement.nativeElement, 'height', fileContentElementHeight + 'px');
                }, 0);
                
            }
        });
    }

}
