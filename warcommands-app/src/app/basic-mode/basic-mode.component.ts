import { Component, OnInit, ViewChild } from '@angular/core';
import { BasicModeComponentDirective } from './basic-mode.directive';
import { GameMiddlewareService } from 'src/warcommands/game-middleware/game-middleware.service';
import { MapType } from 'src/warcommands/gameEngine/domain/maps/model/map-type.enum';
import { DifficultyLevel } from 'src/warcommands/gameEngine/domain/player/model/difficulty-level.enum';
import { CurrentPlayerRepositoryService } from 'src/warcommands/commands-panel/domain/current-player/services/current-player-repository.service';

@Component({
    selector: 'app-basic-mode',
    templateUrl: './basic-mode.component.html',
    styleUrls: ['./basic-mode.component.scss']
})
export class BasicModeComponent implements OnInit {

    @ViewChild(BasicModeComponentDirective, {static: true})
    public basicModeGraphicsWrapper: BasicModeComponentDirective;

    constructor(
        private readonly gameMiddlewareService: GameMiddlewareService,
        private readonly currentPlayerRepository: CurrentPlayerRepositoryService,
    ) { }

    ngOnInit() {

        const viewContainerRef = this.basicModeGraphicsWrapper.viewContainerRef;
        this.gameMiddlewareService.setMap(MapType.BasicMap);
        this.gameMiddlewareService.addPlayer(this.currentPlayerRepository.getPlayer().id);
        this.gameMiddlewareService.addIAPlayer(DifficultyLevel.Mirror);
        this.gameMiddlewareService.initialize(viewContainerRef);

  }

}
