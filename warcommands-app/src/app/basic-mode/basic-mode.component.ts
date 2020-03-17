import { Component, OnInit, ViewChild } from '@angular/core';
import { BasicModeComponentDirective } from './basic-mode.directive';
import { GameMiddlewareService } from 'src/warcommands/game-middleware/game-middleware.service';

@Component({
    selector: 'app-basic-mode',
    templateUrl: './basic-mode.component.html',
    styleUrls: ['./basic-mode.component.scss']
})
export class BasicModeComponent implements OnInit {

    @ViewChild(BasicModeComponentDirective, {static: true})
    public basicModeGraphicsWrapper: BasicModeComponentDirective;

    constructor(private readonly gameMiddlewareService: GameMiddlewareService,
    ) { }

    ngOnInit() {
        
        const viewContainerRef = this.basicModeGraphicsWrapper.viewContainerRef;
        this.gameMiddlewareService.initialize(viewContainerRef);

  }

}
