import { Component, OnInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { BuildingDTO } from 'src/warcommands/basic-mode/domain/building/model/building.dto';
import { MatterFarmBuildingDTO } from 'src/warcommands/basic-mode/domain/building/matter-farm/matter-farm-building.dto';
import { GameEngineBasicModeConfiguration, GAME_CONFIG } from 'src/warcommands/basic-mode/game-engine-basic-mode-configurations';
import { BuildingsNgrxRepositoryService } from 'src/warcommands/basic-mode/infrastructure/ngrx/buildings/buildings-ngrx-repository.service';

@Component({
    selector: 'app-matter-farm',
    templateUrl: './matter-farm.component.html',
    styleUrls: ['./matter-farm.component.scss']
})
export class MatterFarmComponent implements OnInit {

    @Input() data: BuildingDTO;
    building: MatterFarmBuildingDTO;

    @ViewChild('matterFarmElement', { static: true })
    matterFarmElement: ElementRef<HTMLDivElement>;

    constructor(
        @Inject(GAME_CONFIG) private gameConfig: GameEngineBasicModeConfiguration,
        private readonly buildingsNgrxReposioryService: BuildingsNgrxRepositoryService,
    ) { }

    ngOnInit(): void {
        this.building = (this.data as MatterFarmBuildingDTO);
        this.setStyles();

        this.buildingsNgrxReposioryService.watchBuilding(this.building.id).subscribe((building) => {
            this.building = (building as MatterFarmBuildingDTO);
        });
    }

    private setStyles(): void {
        const buildingWidth = this.gameConfig.tileSize * this.building.sizeWidth;
        const buildingHeight = this.gameConfig.tileSize * this.building.sizeHeight;

        this.matterFarmElement.nativeElement.style.setProperty('width', buildingWidth + 'px');
        this.matterFarmElement.nativeElement.style.setProperty('height', buildingHeight + 'px');
        this.matterFarmElement.nativeElement.style.setProperty('left', this.building.xCoordinate * this.gameConfig.tileSize + 'px');
        this.matterFarmElement.nativeElement.style.setProperty('top', this.building.yCoordinate * this.gameConfig.tileSize + 'px');
        this.matterFarmElement.nativeElement.style.setProperty('font-size', this.gameConfig.tileSize + 'px');
    }

}
