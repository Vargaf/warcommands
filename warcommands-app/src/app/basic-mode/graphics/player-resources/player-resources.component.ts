import { Component, OnInit, Input } from '@angular/core';
import { BuildingsNgrxRepositoryService } from 'src/warcommands/basic-mode/infrastructure/ngrx/buildings/buildings-ngrx-repository.service';
import { ResourcesDTO } from 'src/warcommands/basic-mode/domain/share/model/resources.dto';
import { BaseEntityInterface } from 'src/warcommands/basic-mode/domain/building/base/base-entity-interface';
import { BuildingDTO } from 'src/warcommands/basic-mode/domain/building/model/building.dto';


@Component({
    selector: 'app-player-resources',
    templateUrl: './player-resources.component.html',
    styleUrls: ['./player-resources.component.scss']
})
export class PlayerResourcesComponent implements OnInit {

    @Input()
    baseId!: string;

    baseResources: ResourcesDTO = {
        matter: 0,
        energy: 0
    };

    constructor(
        private readonly buildingsNgrxReposioryService: BuildingsNgrxRepositoryService,
    ) { }

    ngOnInit(): void {
        this.buildingsNgrxReposioryService.watchBuilding(this.baseId).subscribe((building: BuildingDTO) => {
            let base = building as unknown as BaseEntityInterface;
            this.baseResources = base.resources;
        });
    }

}
