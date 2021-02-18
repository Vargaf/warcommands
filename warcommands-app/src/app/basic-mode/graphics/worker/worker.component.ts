import { Component, OnInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { RequestAnimationFrameService } from 'src/warcommands/basic-mode/domain/request-animation-frame/request-animation-frame.service';
import { GameEngineBasicModeConfiguration, GAME_CONFIG } from 'src/warcommands/basic-mode/game-engine-basic-mode-configurations';
import { UnitNgrxRepositoryService } from 'src/warcommands/basic-mode/infrastructure/ngrx/units/unit-ngrx-repository.service';
import { CurrentPlayerRepositoryService } from 'src/warcommands/commands-panel/domain/current-player/services/current-player-repository.service';
import { WorkerUnitDTO } from 'src/warcommands/basic-mode/domain/units/model/worker-unit.dto';
import { UnitActionTypeENUM } from 'src/warcommands/basic-mode/domain/units/model/unit-action-type.enum';
import { UnitGenericDTO } from 'src/warcommands/basic-mode/domain/units/model/unit-generic.dto';
import { Subscription } from 'rxjs';
import { UnitActionMoveToDTO } from 'src/warcommands/basic-mode/domain/units/model/unit-action-move-to.dto';
import { PathCoordinate } from 'src/warcommands/basic-mode/domain/units/model/path-coordinate.dto';
import * as _ from 'lodash';


@Component({
    selector: 'app-worker',
    templateUrl: './worker.component.html',
    styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {

    @Input() data!: UnitGenericDTO;
    worker!: WorkerUnitDTO;

    @ViewChild('worker', { static: true })
    public workerElement!: ElementRef<HTMLDivElement>;

    classColor: string = 'colorBlue';

    private currentActionId!: string;
    private currentActionSubscription!: Subscription;
    private path!: PathCoordinate[];

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

        const workerSize = (this.gameConfig.tileSize - 2) / 2;
        this.workerElement.nativeElement.style.setProperty('width', workerSize + 'px');
        this.workerElement.nativeElement.style.setProperty('height', workerSize + 'px');

        this.unitNgrxRepositoryService.watchUnit(this.data.id).subscribe((unit) => {
            this.worker = (unit as WorkerUnitDTO);
            this.updateAction();
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

        return coordinates;
    }

    private updateAction(): void {
        if (this.worker.action && this.worker.action.id !== this.currentActionId) {
            if (this.currentActionSubscription) {
                this.currentActionSubscription.unsubscribe();
            }
            
            if (this.worker.action.type === UnitActionTypeENUM.MoveTo) {
                this.currentActionId = this.worker.action.id;
                this.path = _.clone((this.worker.action as UnitActionMoveToDTO).data.path);
                this.currentActionSubscription = this.requestAnimationFrameService.onFrameUpdate().subscribe((currentTime) => {
                    this.moveUnit(currentTime);
                });
            }
        }
    }

    private moveUnit(currentTime: number): void {
        const tileSize = this.gameConfig.tileSize;
        const workerSize = tileSize / 2;
        
        const xDirection = this.path[1].xCoordinate - this.path[0].xCoordinate;
        const yDirection = this.path[1].yCoordinate - this.path[0].yCoordinate;

        const timeDelta = currentTime - this.path[0].time;
        const positionDelta = timeDelta * tileSize / this.worker.attributes.speed;

        const xCoordinateNew = tileSize * this.path[0].xCoordinate + (positionDelta * xDirection) + workerSize / 2;
        const yCoordinateNew = tileSize * this.path[0].yCoordinate + (positionDelta * yDirection) + workerSize / 2;
        
        this.workerElement.nativeElement.style.setProperty('left', xCoordinateNew + 'px');
        this.workerElement.nativeElement.style.setProperty('top', yCoordinateNew + 'px');

        if (this.path[1].time < currentTime) {
            this.path.splice(0, 1);
        }

        if (this.path.length === 1) {
            const xCoordinateNew = tileSize * this.path[0].xCoordinate + workerSize / 2;
            const yCoordinateNew = tileSize * this.path[0].yCoordinate + workerSize / 2;
            this.workerElement.nativeElement.style.setProperty('left', xCoordinateNew + 'px');
            this.workerElement.nativeElement.style.setProperty('top', yCoordinateNew + 'px');
            this.path = [];
            this.currentActionSubscription.unsubscribe();
        }
    }

}
