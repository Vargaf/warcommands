import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { GameService } from 'src/warcommands/gameEngine/domain/game.service';
import { BasicModeComponentDirective } from './basic-mode.directive';
import { BasicModeGameEngineService } from 'src/warcommands/basic-mode/game-engine-basic-mode.service';

@Component({
    selector: 'app-basic-mode',
    templateUrl: './basic-mode.component.html',
    styleUrls: ['./basic-mode.component.scss']
})
export class BasicModeComponent implements OnInit {

    @ViewChild(BasicModeComponentDirective, {static: true})
    public basicModeGraphicsWrapper: BasicModeComponentDirective;

    constructor(
        private gameService: GameService,
        private gameEngine: BasicModeGameEngineService
    ) { }

    ngOnInit() {

        const viewContainerRef = this.basicModeGraphicsWrapper.viewContainerRef;

        this.gameEngine.setViewContainerRef(viewContainerRef);
        this.gameService.initialize(this.gameEngine);
        this.gameService.start();

  }

}
