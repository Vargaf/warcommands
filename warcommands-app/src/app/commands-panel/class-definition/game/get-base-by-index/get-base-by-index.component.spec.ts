import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GetBaseByIndexComponent} from './get-base-by-index.component';
import {of} from "rxjs";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    CommandPathErrorManagerService
} from "../../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service";
import {
    BuildingsNgrxRepositoryService
} from "../../../../../warcommands/basic-mode/infrastructure/ngrx/buildings/buildings-ngrx-repository.service";
import {
    BuildingsRepositoryService
} from "../../../../../warcommands/basic-mode/domain/building/services/buildings-repository.service";
import {
    CurrentPlayerManagerService
} from "../../../../../warcommands/commands-panel/domain/current-player/current-player-manager-service";
import {MatTooltipModule} from "@angular/material/tooltip";
import {
    CurrentPlayerDTO
} from "../../../../../warcommands/commands-panel/domain/current-player/model/current-player.dto";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {
    BaseClassMemberOptionListComponent
} from "../../base/base-class-member-option-list/base-class-member-option-list.component";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";

describe('GetBaseByIndexComponent', () => {
    let component: GetBaseByIndexComponent;
    let fixture: ComponentFixture<GetBaseByIndexComponent>;

    let formBuilderSpy;
    let commandPathErrorManagerServiceSpy;
    let buildingsNgrxRepositoryServiceSpy;
    let buildingsRepositoryServiceSpy;
    let currentPlayerManagerServiceSpy;

    beforeEach(waitForAsync(() => {
        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        const controlsConfigMock = new FormGroup({
            baseName: new FormControl('', Validators.required),
        });

        commandPathErrorManagerServiceSpy = jasmine.createSpyObj('CommandPathErrorManagerService', ['buildCommandPathError']);
        buildingsNgrxRepositoryServiceSpy = jasmine.createSpyObj('BuildingsNgrxRepositoryService', ['watchBuildingList']);
        buildingsNgrxRepositoryServiceSpy.watchBuildingList.and.returnValue(of(null));
        buildingsRepositoryServiceSpy = jasmine.createSpyObj('BuildingsRepositoryService', ['findBy']);
        buildingsRepositoryServiceSpy.findBy.and.returnValue([]);

        currentPlayerManagerServiceSpy = jasmine.createSpyObj('CurrentPlayerManagerService', ['getCurrentPlayer']);
        const currentPlayerMock: CurrentPlayerDTO = {id: ''};
        currentPlayerManagerServiceSpy.getCurrentPlayer.and.returnValue(currentPlayerMock);

        formBuilderSpy.group.and.returnValue(controlsConfigMock);
        TestBed.configureTestingModule({
            imports: [MatTooltipModule, MatFormFieldModule, MatSelectModule, MatIconModule, BrowserAnimationsModule, ReactiveFormsModule, MatInputModule],
            declarations: [GetBaseByIndexComponent, BaseClassMemberOptionListComponent],
            providers: [
                {provide: FormBuilder, useValue: formBuilderSpy},
                {provide: CommandPathErrorManagerService, useValue: commandPathErrorManagerServiceSpy},
                {provide: BuildingsNgrxRepositoryService, useValue: buildingsNgrxRepositoryServiceSpy},
                {provide: BuildingsRepositoryService, useValue: buildingsRepositoryServiceSpy},
                {provide: CurrentPlayerManagerService, useValue: currentPlayerManagerServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GetBaseByIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
