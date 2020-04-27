import { Component, OnInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { MinionEntity } from 'src/warcommands/gameEngine/domain/minion/model/minion.entity';
import { RequestAnimationFrameService } from 'src/warcommands/basic-mode/domain/request-animation-frame/request-animation-frame.service';
import { Observable } from 'rxjs';
import { GameEngineBasicModeConfiguration, GAME_CONFIG } from 'src/warcommands/basic-mode/game-engine-basic-mode-configurations';
import { UnitNgrxRepositoryService } from 'src/warcommands/basic-mode/infrastructure/ngrx/units/unit-ngrx-repository.service';
import { CurrentPlayerRepositoryService } from 'src/warcommands/commands-panel/domain/current-player/services/current-player-repository.service';

@Component({
    selector: 'app-minion',
    templateUrl: './minion.component.html',
    styleUrls: ['./minion.component.scss']
})
export class MinionComponent implements OnInit {

    @Input() data: MinionEntity;

    @ViewChild('minion', { static: true })
    public minionElement: ElementRef<HTMLDivElement>;

    private requestAnimationFrameIdEvent: Observable<number>;

    classColor: string = 'colorBlue';

    private movementDirection = 2;
    private xCoodinate: number;
    private maxMovement: number;
    private minMovement: number;

    constructor(
        @Inject(GAME_CONFIG) private gameConfig: GameEngineBasicModeConfiguration,
        private readonly unitNgrxRepositoryService: UnitNgrxRepositoryService,
        private readonly currentPlayerRepository: CurrentPlayerRepositoryService,
        private readonly requestAnimationFrameService: RequestAnimationFrameService
    ) { }

    ngOnInit() {
        const minionCoordinates = this.getMinionCoordinates();
        this.minionElement.nativeElement.style.setProperty('top', minionCoordinates.top + 'px');
        this.minionElement.nativeElement.style.setProperty('left', minionCoordinates.left + 'px');

        const minionSize = this.gameConfig.tileSize / 2;
        this.minionElement.nativeElement.style.setProperty('width', minionSize + 'px');
        this.minionElement.nativeElement.style.setProperty('height', minionSize + 'px');

        //this.requestAnimationFrameIdEvent = this.requestAnimationFrameService.getFrameId();
        //this.requestAnimationFrameIdEvent.subscribe((frameId) => { this.onRequestAnimationFrameIdUpdate(); });

        this.unitNgrxRepositoryService.watchUnit(this.data.id).subscribe((unit) => {
            this.data = unit;
        });

        const playerId = this.currentPlayerRepository.getPlayer().id;
        if (playerId !== this.data.playerId) {
            this.classColor = 'colorRed';
        }

    }

    private getMinionCoordinates() {
        const tileSize = this.gameConfig.tileSize;
        const minionSize = tileSize / 2;
        const coordinates = { top: 0, left: 0 };

        coordinates.top = this.data.yCoordinate * tileSize + minionSize / 2;
        coordinates.left = this.data.xCoordinate * tileSize + minionSize / 2;

        this.xCoodinate = coordinates.left;
        this.minMovement = coordinates.left;
        this.maxMovement = this.minMovement + 50;

        return coordinates;
    }

    private onRequestAnimationFrameIdUpdate() {

        const speed = (50 / (1000 / 60 ) / 3);

        if (this.xCoodinate >= this.maxMovement) {
            this.movementDirection = -1;
        }

        if (this.xCoodinate <= this.minMovement) {
            this.movementDirection = 1;
        }

        this.xCoodinate += (this.movementDirection * speed);
        this.minionElement.nativeElement.style.setProperty('left', this.xCoodinate + 'px');

    }

}
