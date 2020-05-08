import { Component, OnInit, Input, ViewChild, ElementRef, Inject, ViewChildren, QueryList, ViewContainerRef, AfterViewInit, Renderer2 } from '@angular/core';
import { GAME_CONFIG, GameEngineBasicModeConfiguration } from 'src/warcommands/basic-mode/game-engine-basic-mode-configurations';
import { BaseEntityInterface } from 'src/warcommands/basic-mode/domain/building/base/base-entity-interface';
import { BuildingsNgrxRepositoryService } from 'src/warcommands/basic-mode/infrastructure/ngrx/buildings/buildings-ngrx-repository.service';
import { RequestAnimationFrameService } from 'src/warcommands/basic-mode/domain/request-animation-frame/request-animation-frame.service';
import { Subscription, Observable, from } from 'rxjs';
import { UnitGenericDTO } from 'src/warcommands/basic-mode/domain/units/model/unit-generic.dto';
import { CurrentPlayerRepositoryService } from 'src/warcommands/commands-panel/domain/current-player/services/current-player-repository.service';
import { BuildingDTO } from 'src/warcommands/basic-mode/domain/building/model/building.dto';

interface UnitSpawningDTO {
    unit: UnitGenericDTO;
    spawnStart: number;
    spawnFinish: number;
}

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit, AfterViewInit {

    @Input() data: BuildingDTO;
    base: BaseEntityInterface;
    queueList: Observable<UnitGenericDTO[]>;

    @ViewChild('base', { static: true })
    public baseElement: ElementRef<HTMLDivElement>;

    @ViewChild('spawn', { static: true })
    public spawnElement: ElementRef<HTMLDivElement>;

    @ViewChild('spiner', { static: true })
    public spinerElement: ElementRef<HTMLDivElement>;

    @ViewChildren('unitInQueue', { read: ElementRef })
    public unitInQueueListElement: QueryList<ElementRef>;

    progress = 0;
    tileSize = 0;
    spinerStrokeWidth = 0;
    isSpawning = false;
    spawningSubscription: Subscription;
    playerBaseId: string;
    private spawningQueue: UnitSpawningDTO[] = [];
    
    unitClassColor: string = 'colorBlue';

    constructor(
        @Inject(GAME_CONFIG) private gameConfig: GameEngineBasicModeConfiguration,
        private readonly buildingsNgrxReposioryService: BuildingsNgrxRepositoryService,
        private readonly requestAnimationFrameService: RequestAnimationFrameService,
        private readonly currentPlayerRepository: CurrentPlayerRepositoryService,
        private readonly renderer: Renderer2
    ) { }

    ngOnInit() {

        this.base = (this.data as BaseEntityInterface);
        this.setStyles();

        const playerId = this.currentPlayerRepository.getPlayer().id;
        if (playerId !== this.base.playerId) {
            this.unitClassColor = 'colorRed';
        } else {
            this.playerBaseId = this.base.id;
        }

        this.buildingsNgrxReposioryService.watchBuilding(this.base.id).subscribe((base) => {
            this.base = (base as BaseEntityInterface);
            
            this.queueList = from([this.base.queueList]);
            if (this.isNewSpawning()) {
                this.manageSpawningSubscription();
            }

            if (this.isSpawning && !this.base.unitSpawning.unit) {
                this.unitSpawned();
            }
            
        });
    }

    ngAfterViewInit(): void {
        this.unitInQueueListElement.changes.subscribe(() => this.updateQueueListStyles());
    }

    private isNewSpawning(): boolean {
        let isNewSpawning = false;

        const spawnFinish = this.base.unitSpawning.spawnFinish;
        const currentTime = this.requestAnimationFrameService.getCurrentTime();
        if (this.base.unitSpawning.unit && currentTime < spawnFinish && !this.isUnitAlreadyInSpaningQueue()) {
            isNewSpawning = true;
        }

        return isNewSpawning;
    }

    private manageSpawningSubscription(): void {
        this.addNewSpawningToQueue();
        if (!this.isSpawning) {
            this.isSpawning = true;
            this.spawningSubscription = this.requestAnimationFrameService.onFrameUpdate().subscribe((currentTime) => {
                this.updateSpawningProgress(currentTime);
            });
        }

    }

    private isUnitAlreadyInSpaningQueue(): boolean {
        const isUnitAlreadySpawning = this.spawningQueue.some((unitSpawning: UnitSpawningDTO) => {
            return unitSpawning.unit.id === this.base.unitSpawning.unit.id;
        });

        return isUnitAlreadySpawning;
    }

    private addNewSpawningToQueue(): void {
        if (!this.isUnitAlreadyInSpaningQueue()) {
            const unitSpawning: UnitSpawningDTO = {
                unit: this.base.unitSpawning.unit,
                spawnStart: this.base.unitSpawning.spawnStart,
                spawnFinish: this.base.unitSpawning.spawnFinish
            };
            this.spawningQueue.push(unitSpawning);
        }
    }

    private updateSpawningProgress(currentTime: number): void {
        if (this.spawningQueue.length > 0) {
            const unitSpawning: UnitSpawningDTO = this.spawningQueue[0];
            if (unitSpawning.spawnStart < currentTime) {
                const spawningTime = unitSpawning.spawnFinish - unitSpawning.spawnStart;
                const progressTime = currentTime - unitSpawning.spawnStart;
                this.progress = Math.min(progressTime * 100 / spawningTime, 100);

                if (this.progress === 100) {
                    this.spawningQueue.shift();
                }

                if (this.spawningQueue.length === 0) {
                    this.spawningProgressUnsubscribe();
                }
            }
        }
    }

    private spawningProgressUnsubscribe(): void {
        this.spawningSubscription.unsubscribe();
    }
    private unitSpawned(): void {
        this.isSpawning = false;
        this.progress = 0;
    }

    private setStyles(): void {
        const baseWidth = this.gameConfig.tileSize * this.base.sizeWidth;
        const baseHeight = this.gameConfig.tileSize * this.base.sizeHeight;

        const spawnSize = this.gameConfig.tileSize;
        const spawnLeft = this.gameConfig.tileSize * this.base.spawnRelativeCoordinates.xCoordinate;
        const spawnTop = this.gameConfig.tileSize * this.base.spawnRelativeCoordinates.yCoordinate;

        const spinnerLeft = this.gameConfig.tileSize * this.base.spawnRelativeCoordinates.xCoordinate;
        const spinnerTop = this.gameConfig.tileSize * (this.base.spawnRelativeCoordinates.yCoordinate - 1);

        this.baseElement.nativeElement.style.setProperty('width', baseWidth + 'px');
        this.baseElement.nativeElement.style.setProperty('height', baseHeight + 'px');
        this.baseElement.nativeElement.style.setProperty('left', this.base.xCoordinate * this.gameConfig.tileSize + 'px');
        this.baseElement.nativeElement.style.setProperty('top', this.base.yCoordinate * this.gameConfig.tileSize + 'px');

        this.spawnElement.nativeElement.style.setProperty('width', spawnSize + 'px');
        this.spawnElement.nativeElement.style.setProperty('height', spawnSize + 'px');
        this.spawnElement.nativeElement.style.setProperty('left', this.base.xCoordinate * this.gameConfig.tileSize + 'px');
        this.spawnElement.nativeElement.style.setProperty('top', spawnTop + 'px');
        this.spawnElement.nativeElement.style.setProperty('left', spawnLeft + 'px');

        this.spinerElement.nativeElement.style.setProperty('top', spinnerTop + 'px');
        this.spinerElement.nativeElement.style.setProperty('left', spinnerLeft + 'px');
        
       this.tileSize = this.gameConfig.tileSize;
       this.spinerStrokeWidth = this.tileSize / 2;
    }

    private updateQueueListStyles(): void {
        if (this.base.queueList.length > 0) {
            const unitSize = (this.gameConfig.tileSize -2) * 0.75;
            const top = (this.gameConfig.tileSize - unitSize) / 2;
            this.unitInQueueListElement.forEach((element, index) => {
                const elementLeftPosition = this.gameConfig.tileSize * index * 0.25;
                element.nativeElement.style.setProperty('width', unitSize + 'px');
                element.nativeElement.style.setProperty('height', unitSize + 'px');
                element.nativeElement.style.setProperty('top', top  + 'px');
                element.nativeElement.style.setProperty('left', elementLeftPosition + 'px');
                this.renderer.addClass(element.nativeElement, this.unitClassColor);
            });
        }
    }

}
