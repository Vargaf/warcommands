import { Component, OnInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { RequestAnimationFrameService } from 'src/warcommands/basic-mode/domain/request-animation-frame/request-animation-frame.service';
import { Observable } from 'rxjs';
import { GameEngineBasicModeConfiguration, GAME_CONFIG } from 'src/warcommands/basic-mode/game-engine-basic-mode-configurations';
import { UnitNgrxRepositoryService } from 'src/warcommands/basic-mode/infrastructure/ngrx/units/unit-ngrx-repository.service';
import { CurrentPlayerRepositoryService } from 'src/warcommands/commands-panel/domain/current-player/services/current-player-repository.service';
import { WorkerUnitDTO } from 'src/warcommands/basic-mode/domain/units/model/worker-unit.dto';

@Component({
    selector: 'app-worker',
    templateUrl: './worker.component.html',
    styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {

    @Input() data: WorkerUnitDTO;

    @ViewChild('worker', { static: true })
    public workerElement: ElementRef<HTMLDivElement>;

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
        const workerCoordinates = this.getWorkerCoordinates();
        this.workerElement.nativeElement.style.setProperty('top', workerCoordinates.top + 'px');
        this.workerElement.nativeElement.style.setProperty('left', workerCoordinates.left + 'px');

        const workerSize = this.gameConfig.tileSize / 2;
        this.workerElement.nativeElement.style.setProperty('width', workerSize + 'px');
        this.workerElement.nativeElement.style.setProperty('height', workerSize + 'px');

        //this.requestAnimationFrameIdEvent = this.requestAnimationFrameService.getFrameId();
        //this.requestAnimationFrameIdEvent.subscribe((frameId) => { this.onRequestAnimationFrameIdUpdate(); });

        this.unitNgrxRepositoryService.watchUnit(this.data.id).subscribe((unit) => {
            this.data = (unit as WorkerUnitDTO);
        });

        const playerId = this.currentPlayerRepository.getPlayer().id;
        if (playerId !== this.data.playerId) {
            this.classColor = 'colorRed';
        }

    }

    private getWorkerCoordinates() {
        const tileSize = this.gameConfig.tileSize;
        const workerSize = tileSize / 2;
        const coordinates = { top: 0, left: 0 };

        coordinates.top = this.data.yCoordinate * tileSize + workerSize / 2;
        coordinates.left = this.data.xCoordinate * tileSize + workerSize / 2;

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
        this.workerElement.nativeElement.style.setProperty('left', this.xCoodinate + 'px');

    }

}
