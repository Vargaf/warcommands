import { Component, OnInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { BuildingDTO } from 'src/warcommands/basic-mode/domain/building/model/building.dto';
import { EnergyFarmBuildingDTO } from 'src/warcommands/basic-mode/domain/building/energy-farm/energy-farm-building.dto';
import { GAME_CONFIG, GameEngineBasicModeConfiguration } from 'src/warcommands/basic-mode/game-engine-basic-mode-configurations';
import { BuildingsNgrxRepositoryService } from 'src/warcommands/basic-mode/infrastructure/ngrx/buildings/buildings-ngrx-repository.service';

@Component({
    selector: 'app-energy-farm',
    templateUrl: './energy-farm.component.html',
    styleUrls: ['./energy-farm.component.scss']
})
export class EnergyFarmComponent implements OnInit {

    @Input() data!: BuildingDTO;
    building!: EnergyFarmBuildingDTO;

    @ViewChild('energyFarmElement', { static: true })
    energyFarmElement!: ElementRef<HTMLDivElement>;

    constructor(
        @Inject(GAME_CONFIG) private gameConfig: GameEngineBasicModeConfiguration,
        private readonly buildingsNgrxReposioryService: BuildingsNgrxRepositoryService,
    ) { }

    ngOnInit(): void {
        this.building = (this.data as EnergyFarmBuildingDTO);
        this.setStyles();

        this.buildingsNgrxReposioryService.watchBuilding(this.building.id).subscribe((building) => {
            this.building = (building as EnergyFarmBuildingDTO);
        });
    }

    private setStyles(): void {
        const buildingWidth = this.gameConfig.tileSize * this.building.sizeWidth;
        const buildingHeight = this.gameConfig.tileSize * this.building.sizeHeight;

        this.energyFarmElement.nativeElement.style.setProperty('width', buildingWidth + 'px');
        this.energyFarmElement.nativeElement.style.setProperty('height', buildingHeight + 'px');
        this.energyFarmElement.nativeElement.style.setProperty('left', this.building.xCoordinate * this.gameConfig.tileSize + 'px');
        this.energyFarmElement.nativeElement.style.setProperty('top', this.building.yCoordinate * this.gameConfig.tileSize + 'px');
        this.energyFarmElement.nativeElement.style.setProperty('font-size', this.gameConfig.tileSize + 'px');
    }

}
