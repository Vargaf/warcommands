import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ModalOuterContainerComponent} from './modal-outer-container.component'
import {ModalPanelComponentParameters} from "../modal-panel-component-parameters";
import {MaterialModule} from "../../share/material/material.module";
import {ModalPanelService} from "../modal-panel.service";
import {ModalDynamicContentDirective} from "../modal-dynamic-content.directive";
import {GameLoopComponent} from "../../commands-panel/commands/game-loop/game-loop.component";
import {MODAL_PANEL_TOKEN} from "../modal-panel-token";
import {
    CommandNgrxRepositoryService
} from "../../../warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service";

describe('ModalOuterContainerComponent', () => {
    let component: ModalOuterContainerComponent;
    let fixture: ComponentFixture<ModalOuterContainerComponent>;

    let dynamicComponentParametersSpy: ModalPanelComponentParameters;
    let modalPanelOverlayServiceSpy: ModalPanelService;
    let commandNgrxRepositoryServiceSpy: CommandNgrxRepositoryService;

    beforeEach(waitForAsync(() => {
        dynamicComponentParametersSpy = {
            component: GameLoopComponent,
            isClosingModalEnabled: true
        };
        modalPanelOverlayServiceSpy = jasmine.createSpyObj('ModalPanelOverlayService', ['remove']);
        commandNgrxRepositoryServiceSpy = jasmine.createSpyObj('CommandNgrxRepositoryService', ['']);
        TestBed.configureTestingModule({
            declarations: [ModalOuterContainerComponent, ModalDynamicContentDirective, GameLoopComponent],
            imports: [MaterialModule],
            providers: [
                {provide: MODAL_PANEL_TOKEN, useValue: dynamicComponentParametersSpy},
                {provide: ModalPanelService, useValue: modalPanelOverlayServiceSpy},
                {provide: CommandNgrxRepositoryService, useValue: commandNgrxRepositoryServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalOuterContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
