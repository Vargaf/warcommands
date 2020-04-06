import { Component, OnInit, ViewChild } from '@angular/core';
import { BasicModeComponentDirective } from './basic-mode.directive';
import { GameMiddlewareService } from 'src/warcommands/game-middleware/game-middleware.service';
import { MapType } from 'src/warcommands/gameEngine/domain/maps/model/map-type.enum';
import { v4 as uuid } from 'uuid';
import { DifficultyLevel } from 'src/warcommands/gameEngine/domain/player/model/difficulty-level.enum';

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
        this.gameMiddlewareService.setMap(MapType.BasicMap);
        this.gameMiddlewareService.addPlayer(uuid());
        this.gameMiddlewareService.addIAPlayer(DifficultyLevel.Mirror);
        this.gameMiddlewareService.initialize(viewContainerRef);

  }

}
